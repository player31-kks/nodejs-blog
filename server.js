const App = require("./app");
const server = new App().app;

server.listen(process.env.PORT, () => {
  console.log("server is listening");
});
