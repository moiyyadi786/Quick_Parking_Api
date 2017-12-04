class ObjectMapper {
  static mapObject(obj, mapping) {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach(key => {
      newObj[mapping[key]] = obj[key]; 
    });
    return newObj;
  }
}

module.exports = ObjectMapper;