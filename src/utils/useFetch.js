import { useState, useEffect } from "react";

const useFetch = async (url, options) => {
  let data;
  let error;

  const fetchData = async () => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      data = json;
    } catch (caughtError) {
      error = caughtError;
    }
  }

  await fetchData();
  return { data, error }
};

export default useFetch;
