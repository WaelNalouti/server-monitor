import React, { useEffect, useState } from "react";
import getData from "../../getData";
import Alert from "@material-ui/lab/Alert";
import Globals from "../globals/Globals";
import Stats from "../stats/Stats";
import "./Main.css";

export default function Main() {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState(true);
  const [RAMalert, setRAMalert] = useState(false);
  const [Diskalert, setDiskalert] = useState(false);
  const [RAMsuccess, setRAMsuccess] = useState(false);
  const [Disksuccess, setDisksuccess] = useState(false);

  const RAM_MAX = 90; //90
  const RAM_MIN = 90; //90
  const DISK_MAX = 80; //80
  const DISK_MIN = 50; //50

  //Show alerts for 20 sec
  useEffect(() => {
    const showAlert = setTimeout(() => {
      setAlert(false);
    }, 20000);
    return () => clearTimeout(showAlert);
  }, []);

  //fetch the data
  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  //check data for showing proper alerts
  useEffect(() => {
    const checkAlerts = (ram, disk) => {
      if (parseInt(ram, 10) >= RAM_MAX) {
        setRAMalert(true);
      }
      if (parseInt(disk, 10) >= DISK_MAX) {
        setDiskalert(true);
      }
      if (parseInt(ram, 10) <= RAM_MIN) {
        setRAMsuccess(true);
      }
      if (parseInt(disk, 10) <= DISK_MIN) {
        setDisksuccess(true);
      }
    };
    checkAlerts(data?.RAM.memory.percentMem, data?.DISK.disk.percentUsage);
  }, [data]);

  return (
    <div className="main">
      <Globals />
      <div className="main__container">
        {alert ? (
          <div className="alerts">
            {RAMalert ? (
              <Alert
                severity="error"
                variant="filled"
                onClose={() => {
                  setRAMalert(false);
                  console.log(RAMalert);
                }}
                className="alert--box"
              >
                {data?.host}'s <b>RAM</b> usage has surpassed <b>{RAM_MAX}%</b>
              </Alert>
            ) : (
              ""
            )}
            {Diskalert ? (
              <Alert
                severity="error"
                variant="filled"
                onClose={() => {
                  setDiskalert(false);
                }}
                className="alert--box"
              >
                {data?.host}'s <b>disk {data?.DISK.disk.diskpath}\</b> usage has
                surpassed <b>{DISK_MAX}%</b>
              </Alert>
            ) : (
              ""
            )}
            {RAMsuccess ? (
              <Alert
                severity="success"
                variant="filled"
                onClose={() => {
                  setRAMsuccess(false);
                }}
                className="alert--box"
              >
                {data?.host}'s <b>RAM</b> is doing well !
              </Alert>
            ) : null}
            {Disksuccess ? (
              <Alert
                severity="success"
                variant="filled"
                onClose={() => {
                  setDisksuccess(false);
                }}
                className="alert--box"
              >
                {data?.host}'s <b>disk {data?.DISK.disk.diskpath}\</b> is doing
                well !
              </Alert>
            ) : null}
          </div>
        ) : null}

        <div className="main__stats">
          <Stats
            title={data?.RAM.type}
            usage={data?.RAM.memory.percentMem}
            free={data?.RAM.memory.free}
            total={data?.RAM.memory.total}
          />
          <Stats
            title={`Disk ${data?.DISK.disk.diskpath}\\`}
            usage={data?.DISK.disk.percentUsage}
            free={data?.DISK.disk.free}
            total={data?.DISK.disk.size}
          />
        </div>
      </div>
    </div>
  );
}
