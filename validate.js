const requiredProperties = ["name", "greeting", "ornQuote", "greetBy"];

function validate(body) {
  let missingProperties = [];
  requiredProperties.forEach((propertyName) => {
    if (!Object.hasOwn(body, propertyName)) {
      missingProperties.push(propertyName);
    }
  });
  return missingProperties;
}

module.exports = {
  validate,
};
