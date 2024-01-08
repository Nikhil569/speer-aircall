import { Calls, Loading } from "../common";
import useFetchAPI from "../../hooks/useFetchAPI.js";

const AllCalls = ({ comp, setComp, call_id }) => {
  const { keys, calls, isLoading, isError } = useFetchAPI(
    "activities",
    "all",
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

export default AllCalls;
