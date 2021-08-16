import checkDiskSpace from "check-disk-space";

let disk = {
  diskpath: "😕No disk found",
  free: "N/A",
  size: "N/A",
  percentUsage: "N/A",
};

export default class DiskDAO {
  static async getDiskInfo() {
    try {
      checkDiskSpace("D:/").then((diskSpace) => {
        disk.diskpath = diskSpace.diskPath;
        disk.free = (diskSpace.free / 1024 / 1024 / 1024).toFixed(2) + " GB";
        disk.size = (diskSpace.size / 1024 / 1024 / 1024).toFixed(2) + " GB";
        disk.percentUsage =
          (((diskSpace.size - diskSpace.free) * 100) / diskSpace.size).toFixed(
            2
          ) + "%";
      });
      return disk;
    } catch (error) {
      console.log("Cannot access disk data");
    }
  }
}
