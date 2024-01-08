import { Calls, Loading, Error } from "../common";
import useFetchAPI from "../../hooks/useFetchAPI.js";

const Inbox = ({ comp, setComp, call_id }) => {
  const { keys, calls, isLoading, isError } = useFetchAPI(
    "activities",
    "inbound",
    false
  );

  return (
    <>
      {!isLoading.current && (
        <Calls
          keys={keys}
          calls={calls}
          comp={comp}
          setComp={setComp}
          call_id={call_id}
        />
      )}
      {isLoading.current && <Loading />}
      {isError.current && <Error />}
    </>
  );
};

export default Inbox;
