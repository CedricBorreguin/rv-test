import React from 'react';

const apiStates = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

function APIRequest (url) {
  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: '',
    data: [],
  });

  const setPartData = (partialData) => setData({ ...data, ...partialData });

  React.useEffect(() => {
    setPartData({
      state: apiStates.LOADING,
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPartData({
          state: apiStates.SUCCESS,
          data
        });
      })
      .catch(() => {
       setPartData({
          state: apiStates.ERROR,
          error: 'fetch failed'
        });
      });
  }, []);

  return data;
};

export default APIRequest;

export {
  apiStates,
}
