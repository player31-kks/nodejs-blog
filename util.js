const { LocalDateTime, nativeJs } = require("@js-joda/core");

function transformLocalDate(data) {
  data.createdAt = LocalDateTime.from(nativeJs(data.createdAt)).toString();
  data.updatedAt = LocalDateTime.from(nativeJs(data.updatedAt)).toString();
  return data;
}

module.exports = {
  transformLocalDate,
};
