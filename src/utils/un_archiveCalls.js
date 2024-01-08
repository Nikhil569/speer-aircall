import axios from "axios";

const un_archiveCalls = async (call_type, keys, calls) => {
  let res = "";
  let err = "";
  let baseUrl = "https://cerulean-marlin-wig.cyclic.app";

  if (call_type == "Inbox" || call_type == "AllCalls") {
    let callsArr = [];
    keys.current.forEach((key) => {
      callsArr = callsArr.concat(calls[key].map((call) => call));
    });

    let data = {
      is_archived: true,
    };

    try {
      let resArr = await Promise.all(
        callsArr.map((call) => {
          let fullURL = `${baseUrl}/activities/${call.id}`;
          return axios.patch(fullURL, data);
        })
      );
      res = { status: 200 };
      resArr.forEach((result) => {
        if (result.status != 200) res.status = 201;
      });
      return { res, err };
    } catch (e) {
      console.log(e);
      err = e;
      return { res, err };
    }
  } else if (call_type == "Archived") {
    let fullURL = `${baseUrl}/reset`;
    try {
      res = await axios.patch(fullURL);
      return { res, err };
    } catch (e) {
      console.log(e);
      err = e;
      return { res, err };
    }
  }
};

export default un_archiveCalls;
