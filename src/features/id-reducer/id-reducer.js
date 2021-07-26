const getID = state => state ? state.id : undefined;

const updateID = ({ id } = {}) => ({
  type: 'ID::UPDATE_ID',
  payload: id
});

const idReducer = (state = '', { type, payload } = {}
) => {
  switch (type) {
    case updateID().type: return payload;
    default: return state;
  }
};

export { idReducer, updateID, getID };