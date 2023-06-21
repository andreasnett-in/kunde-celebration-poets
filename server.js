const express = require("express");
var mustacheExpress = require("mustache-express");
const { validate } = require("./validate");

const app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.locals.user = { name: "Andreas" };
app.use(express.json());

app.post("/v1/birthday", (req, res) => {
  const missingProperties = validate(req.body);
  if (!!missingProperties.length) {
    res.statusMessage = `Missing fields: ${missingProperties.reduce(
      (prev, curr, i, a) => {
        prev += curr;
        if (i != a.length) prev += ", ";
      },
      ""
    )}`;

    return res.status(403).end();
  }
  app.locals.user = req.body;
  return res.status(200).end();
});

app.get("/", (req, res) => {
  res.render("index", app.locals.user);
});

app.listen(3000, () => console.log("App listening on port 3000"));
