import os from "os";

let RAM = {
  free: null,
  total: null,
  percentMem: null,
};

export default class MemoryDAO {
  static async getMemoryInfo() {
    try {
      RAM.free = (await (os.freemem() / 1024 / 1024 / 1024).toFixed(2)) + " GB";
      RAM.total =
        (await (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)) + " GB";

      if (RAM.free !== null && RAM.total !== null) {
        RAM.percentMem =
          (((os.totalmem() - os.freemem()) * 100) / os.totalmem()).toFixed(2) +
          "%";
      } else {
        return;
      }
      return RAM;
    } catch (error) {
      console.log("Cannot access memory data");
    }
  }
}
