const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=0ed1e559d8a1436786f55838231304&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.condition.text} It is currently ${data.temp_c} degrees out. There is a ${data.precip_mm} chance of rain`
      );
    }
  });
};
module.exports = forecast;
