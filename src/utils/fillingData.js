// Filling from,to,via,call_type if they are empty in data

const fillingData = (calls) => {
  return calls.map((call) => {
    call.from = call.from ? call.from : "UNKNOWN";
    call.to = call.to ? call.to : "UNKNOWN";
    call.via = call.via ? call.via : "UNKNOWN";
    call.call_type = call.call_type ? call.call_type : "unknown";

    return call;
  });
};

export default fillingData;
