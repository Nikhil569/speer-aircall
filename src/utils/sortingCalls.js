const sortByDate = (k1, k2) => {
  let d1 = new Date(k1);
  let d2 = new Date(k2);

  return d2 - d1;
};

const sortingCalls = (calls, dir, archived) => {
  let callsByDate = {};
  let keys = [];

  //   Used string for filtering because I dont know the value in is_archived is boolean or string
  calls = calls.filter((call) => {
    if (dir == "all") {
      return String(call.is_archived) == String(archived);
    }

    return (
      call.direction == dir && String(call.is_archived) == String(archived)
    );
  });

  calls.forEach((call) => {
    let date = new Date(call.created_at);

    // Date Strings as keys for inCalls object
    let key = `${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getDate()} ${date.getFullYear()}`;

    if (key in callsByDate) callsByDate[key] = [...callsByDate[key], call];
    else {
      callsByDate[key] = [call];
      keys.push(key);
    }
  });

  keys.sort(sortByDate);

  for (const key in callsByDate) {
    callsByDate[key] = callsByDate[key].sort((c1, c2) =>
      sortByDate(c1.created_at, c2.created_at)
    );
  }

  return { keys, callsByDate };
};

export default sortingCalls;
