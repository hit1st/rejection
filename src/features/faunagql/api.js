import { useSelector } from 'react-redux';
import useFetch from '../../utils/useFetch.js';
import { getID } from '../id-reducer/id-reducer.js';

const getData = (data) => (!data || data.errors) ? null : data.data;

const getErrorMessage = (error, data) => {
  if (error) return error.message;
  if (data && data.errors) return data.errors[0].message;
  return null;
};

const getUseFetchOptions = (query) => ({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    query
  }),
});

const useFetchData = (data, error) => ({
  data: getData(data),
  errorMessage: getErrorMessage(error, data),
  error,
});

const useID = async (userName = "Imposter Developer") => {
  const query = `query FindIdByUserName ($name: String = "${userName}") {
    userByName(name: $name) {
      data {
        id: _id
      }
    }
  }`;
  const { data, error} = await useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    getUseFetchOptions(query)
  );

  return useFetchData(data, error);
}

const useRejections = async (id = "304846704870425155") => {
  const query = `query FindRejectionsByID ($id: ID = "${id}") {
    findUserByID(id: $id) {
      rejections {
        data {
          question
          askee
          status
          id: _id
          timestamp: _ts
        }
      }
    }
  }`;
  const { data, error} = await useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    getUseFetchOptions(query)
  );

  return useFetchData(data, error);
};

const createRejection = async ([newRejection = {}] = []) => {
  const query = `mutation CreateARejection($newRejection: RejectionInput!) {
    createRejection(data: $newRejection) {
      question
      askee
      status
      id: _id
      timestamp: _ts
    }
  }`;

  const res = await fetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { newRejection }
      }),
    }
  );
  const data = await res.json();
  
  return data;
};

export { useID, useRejections, createRejection };
