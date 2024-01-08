import { Fragment } from "react";
import "../../css/Calls.css";
import {
  phone,
  callIn,
  callOut,
  callMissed,
  callVoice,
  archive,
} from "../../assets";
import un_archiveCalls from "../../utils/un_archiveCalls";

const Calls = ({ keys, calls, comp, setComp, call_id }) => {
  const call_type = {
    inbound: callIn,
    outbound: callOut,
    missed: callMissed,
    voicemail: callVoice,
    unknown: phone,
  };

  const getCallTime = (time) => {
    const t = new Date(time);
    let hr = t.getUTCHours();

    // Locale String to make sure single digit have a zero in front
    hr = (hr > 12 ? hr - 12 : hr).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    let min = t.getUTCMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return hr + ":" + min;
  };

  const getCallAM_PM = (time) => {
    const t = new Date(time);

    return t.getUTCHours() > 12 ? "PM" : "AM";
  };

  const viewCallInfo = (id) => {
    call_id.current = id;
    setComp((prev) => [prev[1], "CallInfo"]);
  };

  const msg = () => {
    if (comp[1] == "Inbox") {
      return "Archive all Incoming calls";
    } else if (comp[1] == "Archived") {
      return "Unarchive all calls";
    } else return "Archive all calls";
  };

  const archiveCalls = () => {
    setComp((prev) => {
      return [prev[1], "Loading"];
    });

    un_archiveCalls(comp[1], keys, calls).then(({ res, err }) => {
      if (res != "" || res.status == 200) setComp((prev) => [prev[0], prev[0]]);
      else setComp((prev) => [prev[0], "Error"]);
    });
  };

  return (
    <div className="calls-container">
      <div className="archive-calls-container" onClick={archiveCalls}>
        <img src={archive} />
        <h4>{msg()}</h4>
      </div>

      {keys.current.map((key, ind) => {
        return (
          <Fragment key={ind}>
            <h4>
              <span>{key}</span>
            </h4>

            {calls[key].map((call) => {
              return (
                <div
                  className="call-card"
                  onClick={() => viewCallInfo(call.id)}
                >
                  <img
                    src={
                      call.call_type == "answered"
                        ? call_type[call.direction]
                        : call_type[call.call_type]
                    }
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      {call.from ? call.from : "UNKNOWN"}
                    </div>
                    <div style={{ color: "gray", fontSize: "0.8rem" }}>
                      tried to call on {call.to ? call.to : "UNKNOWN"}
                    </div>
                  </div>
                  <div className="call-time">
                    {getCallTime(call.created_at)}
                  </div>
                  <div className="call-am_pm">
                    {getCallAM_PM(call.created_at)}
                  </div>
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Calls;
