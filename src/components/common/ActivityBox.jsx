import { useEffect, useRef } from "react";
import { aircallLogo, backArrow, filterIcon } from "../../assets";
import "../../css/ActivityBox.css";

const ActivityBox = ({ comp, setComp }) => {
  const dropDown = useRef(null);

  const viewArchived = () => {
    setComp((prev) => [prev[1], "Archived"]);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      let flag = dropDown.current.className.includes("inactive");

      if (e.target.className == "filter-icon") {
        if (flag) {
          dropDown.current.className = dropDown.current.className.replace(
            " inactive",
            ""
          );
          dropDown.current.className += " active";
        } else {
          dropDown.current.className = dropDown.current.className.replace(
            " active",
            ""
          );
          dropDown.current.className += " inactive";
        }
      } else {
        if (!flag) {
          dropDown.current.className = dropDown.current.className.replace(
            " active",
            ""
          );
          dropDown.current.className += " inactive";
        }
      }
    });
  }, []);

  return (
    <div className="activity-container">
      {comp[1] != "CallInfo" ? (
        <>
          <div className="activity-image">
            <img src={aircallLogo} />
            <span>Activity</span>
          </div>
          <h6
            className={comp[1] == "Inbox" ? "selected" : ""}
            onClick={() => setComp((prev) => [prev[1], "Inbox"])}
          >
            Inbox
          </h6>
          <div className="separator"></div>
          <h6
            className={comp[1] == "AllCalls" ? "selected" : ""}
            onClick={() => setComp((prev) => [prev[1], "AllCalls"])}
          >
            All Calls
          </h6>
          <div className="separator"></div>
          <div className="dropdown-archived">
            <img src={filterIcon} className="filter-icon" />
            <div
              className="archived inactive"
              ref={dropDown}
              onClick={viewArchived}
            >
              Archived
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {comp[1] == "CallInfo" ? (
        <>
          <img
            src={backArrow}
            className="back"
            onClick={() => setComp((prev) => [prev[1], prev[0]])}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ActivityBox;
