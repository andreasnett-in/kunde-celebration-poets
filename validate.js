const requiredProperties = ["name", "greeting"];

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
