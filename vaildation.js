// validationMiddleWare를 만드는 방법입니다.
// 따라하지 마세요 더 좋은 vaildation 방법들이 많습니다.

module.exports = function validationMiddleWare(schma) {
  return (req, res, next) => {
    const result = validationBody(schma, req.body);
    if (result) {
      return next();
    }
    return res.send({ success: false, msg: "validation Error" });
  };
};

function validationBody(schema, body) {
  const bodyMap = createMap(body);
  const schemaMap = createSchemaMap(schema);

  if (bodyMap.size !== schemaMap.size) {
    return false;
  }

  for (const [key, value] of bodyMap) {
    const schemaType = schemaMap.get(key);
    if (value !== schemaType) {
      return false;
    }
  }
  return true;
}

function createMap(obj) {
  const map = new Map();
  for (const [key, value] of Object.entries(obj)) {
    value === "" ? map.set(key, undefined) : map.set(key, typeof value);
  }
  return map;
}

function createSchemaMap(schema) {
  const map = new Map();
  for (const key of getKeys(schema)) {
    const typeOfKey = getTypeofRequiredKey(schema, key);
    if (typeOfKey) {
      map.set(key, typeof typeOfKey);
    }
  }
  return map;
}

function getKeys(schema) {
  return Object.keys(schema.paths);
}

function getTypeofRequiredKey(schema, key) {
  const value = schema.paths[key];
  return value.isRequired ? value.instance : undefined;
}
