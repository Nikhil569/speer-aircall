import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { fillingData, sortingCalls } from "../utils";

const useFetchAPI = (url, dir, archived) => {
  const [calls, setCalls] = useState({});
  const keys = useRef([]);
  const isLoading = useRef(true);
  const isError = useRef(false);

  useEffect(() => {
    let baseUrl = "https://cerulean-marlin-wig.cyclic.app/";
    axios
      .get(baseUrl + url)
      .then((res) => {
        res.data = fillingData(res.data);
        let prop = sortingCalls(res.data, dir, archived);
        keys.current = prop.keys;
        isLoading.current = false;
        isError.current = false;
        setCalls(prop.callsByDate);
      })
      .catch((err) => {
        isLoading.current = false;
        isError.current = true;
        console.log(err);
      });
  }, []);

  return { keys, calls, isLoading, isError };
};

export default useFetchAPI;
