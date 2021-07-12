const createNamedWrapperReducer = (reducerFunc, reducerName) =>
  (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    return (name !== reducerName && !isInitializationCall) ? state : reducerFunc(state, action);
  };

const createNamedWrapperActionCreator = (actionCreatorFunc, actionCreatorName) => 
  (value) => ({
    ...actionCreatorFunc(value),
    name: actionCreatorName,
  });

export { createNamedWrapperReducer, createNamedWrapperActionCreator };
