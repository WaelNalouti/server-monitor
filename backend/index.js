import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MemoryDAO from "./DAO/MemoryDAO.js";
import DiskDAO from "./DAO/DiskDAO.js";
import IfacesDAO from "./DAO/IfacesDAO.js";
import os from "os";

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;
const url = process.env.BASE_URL;
//applying middleware
app.use(cors());
app.use(express.json()); //the server can accept json in the body of the request

let stats = {
  date: new Date(),
  host: "",
  os: "",
  localNetwork: {},
  Ifaces: {},
  RAM: {},
  DISK: {},
};

stats.host = os.hostname();
stats.os = os.platform() + " @ " + os.release();

await IfacesDAO.getNetworkInterfaces().then((networks) => {
  stats.localNetwork = networks.NETWORK;
  stats.Ifaces = networks.connectedIfaces;
});

await MemoryDAO.getMemoryInfo().then(
  (memory) => {
    stats.RAM = {
      type: "RAM",
      memory,
    };
  },
  await DiskDAO.getDiskInfo().then((disk) => {
    stats.DISK = {
      type: "DISK",
      disk,
    };
  }),

  app.get(url, (req, res) => {
    res.json(stats);
  })
);
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}${url}`);
  console.log(stats);
});
