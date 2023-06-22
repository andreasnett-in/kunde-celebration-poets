const express = require("express");
var mustacheExpress = require("mustache-express");
const { validate } = require("./validate");

const app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.locals.user = { name: "Andreas" };
app.use(express.json());
app.use("/assets", express.static(__dirname + "/assets"));

const months = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

app.post("/v1/birthday", (req, res) => {
  const data = { ...req.body };
  var now = new Date();
  data["date"] = `${now.getDate()}. ${
    months[now.getMonth()] || now.getMonth()
  } ${now.getFullYear()}`;
  const base = __dirname + "/assets";
  data["logo"] = base + "Logo.png";
  data["orn"] = base + "orn.png";
  const missingProperties = validate(data);
  if (!!missingProperties.length) {
    res.statusMessage = `Missing fields: ${missingProperties.reduce(
      (prev, curr, i, a) => {
        prev = prev + curr;
        if (i != a.length - 1) prev += ", ";
        return prev;
      },
      ""
    )}`;

    return res.status(403).end();
  }
  app.locals.user = data;
  return res.status(200).end();
});

app.get("/", (req, res) => {
  res.render("index", app.locals.user);
});
app.get("/b", (req, res) => {
  res.sendFile("views/b.html", { root: __dirname });
});

app.listen(8080, () => console.log("App listening on port 8080"));
