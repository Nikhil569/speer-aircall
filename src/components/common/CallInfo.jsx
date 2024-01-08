import { useEffect, useState } from "react";
import {
  callIn,
  callOut,
  callMissed,
  callVoice,
  person,
  phone,
  video,
  chat,
  email,
} from "../../assets";
import axios from "axios";
import "../../css/CallInfo.css";
import { fillingData } from "../../utils";

const CallInfo = ({ setComp, call_id }) => {
  let baseUrl = "https://cerulean-marlin-wig.cyclic.app";
  let fullURL = `${baseUrl}/activities/${call_id.current}`;

  const [callInfo, setCallInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const call_type = {
    inbound: [callIn, "Incoming Call"],
    outbound: [callOut, "Outgoing Call"],
    missed: [callMissed, "Missed Call"],
    voicemail: [callVoice, "Voicemail"],
    unknown: [phone, "Call"],
  };

  const changeArchive = () => {
    let data = {
      is_archived: String(callInfo.is_archived) == "true" ? false : true,
    };
    axios
      .patch(fullURL, data)
      .then((res) => {
        if (res.status == 200) {
          setComp((prev) => [prev[1], prev[0]]);
        } else {
          setComp((prev) => [prev[1], "Error"]);
        }
      })
      .catch((err) => {
        console.log(err);
        setComp((prev) => [prev[1], "Error"]);
      });
  };

  const callDuration = () => {
    let dur = Number(callInfo.duration);
    let h = Math.floor(dur / 3600);
    let m = Math.floor((dur % 3600) / 60);
    let s = Math.floor((dur % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  useEffect(() => {
    axios
      .get(fullURL)
      .then((res) => {
        // fillingData accepts array as argument and return array
        [res.data] = fillingData([res.data]);
        setCallInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setComp((prev) => [prev[1], "Error"]);
      });
  }, []);

  return (
    <>
      {/* {isLoading ? "Loading" : ""} */}
      {!isLoading ? (
        <div className="call-info-container">
          <div className="person">
            <img src={person} />
            <h4>{callInfo.from ? callInfo.from : "UNKNOWN"}</h4>
            <h5>{callInfo.to ? callInfo.to : "UNKNOWN"}</h5>
          </div>
          <div className="call-info-icons">
            <img src={phone}></img>
            <img src={video}></img>
            <img src={chat}></img>
            <img src={email}></img>
          </div>
          <h4>Call History</h4>
          <div className="call-history">
            <img
              src={
                callInfo.call_type == "answered"
                  ? call_type[callInfo.direction][0]
                  : call_type[callInfo.call_type][0]
              }
            />
            <div className="call-type">
              <h4>
                {callInfo.call_type == "answered"
                  ? call_type[callInfo.direction][1]
                  : call_type[callInfo.call_type][1]}
              </h4>
              <h5>VIA: {callInfo.via ? callInfo.via : "UNKNOWN"}</h5>
            </div>
            <h4 className="call-duration">{callDuration()}</h4>
          </div>
          <button className="call-info-archive-btn" onClick={changeArchive}>
            {String(callInfo.is_archived) == "true" ? "Unarchive" : "Archive"}
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CallInfo;
