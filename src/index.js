const express = require("express");
const server = express();
const routes = require("./routes");
const PORT = process.env.PORT;
const { initDB } = require("./services/db");
const cors = require("cors");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "true");
  res.send("Api is running...");
});

//routes
server.use("/api", routes);

server.listen(PORT, () => {
  initDB();
  console.log(`el servidor esta escuchando en el puerto: ${PORT}`);
});
