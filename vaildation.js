// 1. Schma를 본다.
// 2. 정보를 가지고온다.
// 3. required 된것만 가지고온다.

// 4. typecheking을 한다.

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
    map.set(key, typeof value);
  }
  return map;
}

function createSchemaMap(schema) {
  const map = new Map();
  for (const key of getKeys(schema)) {
    const typeOfKey = getTypeOfKey(schema, key);
    map.set(key, typeof typeOfKey);
  }
  return map;
}

function getKeys(schema) {
  return Object.keys(schema.paths);
}

function getTypeOfKey(schema, key) {
  return schema.paths[key].instance;
}
