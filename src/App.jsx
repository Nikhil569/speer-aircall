import {
  Header,
  ActivityBox,
  CallInfo,
  Error,
  Loading,
  Footer,
} from "./components/common";
import { AllCalls, Archived, Inbox } from "./components/pages";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  // An array as comp to store previous values
  const [comp, setComp] = useState(["Inbox", "Inbox"]);
  const call_id = useRef("");

  const switchComponent = (val) => {
    switch (val) {
      case "Inbox":
        return <Inbox comp={comp} setComp={setComp} call_id={call_id} />;

      case "AllCalls":
        return <AllCalls comp={comp} setComp={setComp} call_id={call_id} />;

      case "Archived":
        return <Archived comp={comp} setComp={setComp} call_id={call_id} />;

      case "CallInfo":
        return <CallInfo setComp={setComp} call_id={call_id} />;

      case "Error":
        return <Error />;

      case "Loading":
        return <Loading />;

      default:
        return "";
    }
  };

  return (
    <div id="app">
      <div className="container">
        <Header />
        <ActivityBox comp={comp} setComp={setComp} />
        <div className="container-view">{switchComponent(comp[1])}</div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
