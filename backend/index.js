import express from "express"
import dotenv from "dotenv";
import MemoryDAO from "./DAO/MemoryDAO.js";
import DiskDAO from "./DAO/DiskDAO.js";
import os from "os"


const app = express()
dotenv.config();

const port = process.env.PORT || 8000;
//applying middleware
app.use(express.json()); //the server can accept json in the body of the request





// let RAM;
// let DISK;
let stats =  {
    host: "",
    os:"",
    RAM: {},
    DISK: {},
};

stats.host = os.hostname(),
stats.os = os.platform() + " @ " +  os.release(),
await MemoryDAO.getMemoryInfo().then((memory) => {
    stats.RAM = {
        type:"RAM",
        memory,
    };
},
await DiskDAO.getDiskInfo().then((disk) => {
    stats.DISK = {
        type: "DISK",
        disk,
    };
}),


app.get('/api/v1/stats', (req, res) => {
  res.json(stats)
})

)
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
  console.log(stats);
})






