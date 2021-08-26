const getIsLoading = state => state.isLoading;

const isNotLoading = () => ({
  type: 'IS_NOT_LOADING',
  payload: false
});

const isLoading = () => ({
  type: 'IS_LOADING',
  payload: true
});

const isLoadingReducer = (
  state = true,
  { type, payload } = {}
) => {
  switch (type) {
    case isNotLoading().type:
    case isLoading().type:
      return payload
    default: 
      return state;
  };
};

export default isLoadingReducer;
export { isNotLoading, isLoading, getIsLoading }
