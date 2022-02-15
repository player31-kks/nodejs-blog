// https://jojoldu.tistory.com/600 이글을 참고해 보시면 좋을 것 같습니다!!!
const jsJoda = require("@js-joda/core");
var { ZoneId, ZonedDateTime, nativeJs } = jsJoda;
require("@js-joda/timezone");

const moment = require("moment-timezone");

function transformLocalDate(data) {
  const KOREA = ZoneId.of("Asia/Seoul");
  data._doc.createdAt = ZonedDateTime.from(nativeJs(data.createdAt), KOREA).toString();
  data._doc.updatedAt = ZonedDateTime.from(nativeJs(data.updatedAt), KOREA).toString();
  return data;
}

function transformLocalDateByMoment(data) {
  data._doc.createdAt = moment.tz(data.createdAt, "Asia/Seoul");
  data._doc.updatedAt = moment.tz(data.createdAt, "Asia/Seoul");
  return data;
}

module.exports = {
  transformLocalDate,
  transformLocalDateByMoment,
};

//client에서 사용할때
// const utcZoned = ZonedDateTime.of(ZonedDateTime.parse(reuslt.createdAt).toLocalDateTime(), ZoneOffset.UTC);
// const KOREA = ZoneId.of("Asia/Seoul");
// const korea = utcZoned.withZoneSameInstant(KOREA);
// const koreaLocal = korea.toLocalDateTime();
// console.log(koreaLocal.toString());
