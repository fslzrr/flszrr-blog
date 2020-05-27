import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";
const headers = { "Access-Control-Allow-Origin": "*" };

const useRequest = (verb, path, params = {}, data = {}, opts = {}) => {
  const [response, setResponse] = useState(null);
  const [counter, setCounter] = useState(0);

  const requestAgain = () => setCounter(counter + 1);
  useEffect(() => {
    async function fetchData() {
      const response = await axios[verb](API_URL + path, {
        params,
        data,
        headers,
        ...opts,
      });
      setResponse(response.data);
    }

    fetchData();
  }, [counter]);

  return [response, requestAgain];
};

const post = async (path, params = {}, data = {}, opts = {}) =>
  await axios.post(API_URL + path, data, { params, ...opts });

const put = async (path, params = {}, data = {}, opts = {}) =>
  await axios.put(API_URL + path, data, { params, ...opts });

const deleteR = async (path, params = {}, opts = {}) =>
  await axios.delete(API_URL + path, { params, ...opts });

export { useRequest, post, put, deleteR };
