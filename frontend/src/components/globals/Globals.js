import React, { useEffect, useState } from "react";
import "./Globals.css";
import getData from "../../getData";
import RefreshIcon from "@material-ui/icons/Refresh";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsSystemDaydreamIcon from "@material-ui/icons/SettingsSystemDaydream";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

function Globals() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  const refreshData = () => {
    getData().then((res) => setData(res));
  };

  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    setDay(new Date().getDate().toString());
    setMonth((new Date().getMonth() + 1).toString());
    setTime(new Date().toTimeString().substring(0, 8));
    setDate(year + " " + month + " " + day);
  }, [data]);

  return (
    <div className="globals">
      <div className="globals__left">
        <div className="globals__item">
          <p className="globals__item--title">
            <DesktopWindowsIcon style={{ fontSize: 21, marginRight: 10 }} />
            Host
          </p>
          <span className="globals__item--data">{data?.host}</span>
        </div>
        <div className="globals__item">
          <p className="globals__item--title">
            <SettingsSystemDaydreamIcon
              style={{ fontSize: 21, marginRight: 10 }}
            />
            Os
          </p>

          <p className="globals__item--data">{data?.os}</p>
        </div>
        <div className="globals__item">
          <p className="globals__item--title">
            <FingerprintIcon style={{ fontSize: 25, marginRight: 10 }} />
            IP
          </p>
          <span className="globals__item--data">
            {data?.localNetwork[0]?.f?.address || "not connected"}
          </span>
        </div>
      </div>
      <div className="globals__right">
        <p className="refresh__date">
          Last update
          <span className="refresh__date--last">{date}</span>
          at
          <span className="refresh__date--last"> {time}</span>
        </p>
        <div className="refreshBtn" onClick={refreshData}>
          <RefreshIcon style={{ fontSize: 24 }} />
        </div>
      </div>
    </div>
  );
}

export default Globals;
