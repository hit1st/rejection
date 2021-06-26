const getVisibilityFilter = state => state ? state.visibilityFilter : undefined;

const visibilityFilter = (
  state = 'SHOW_ALL',
  { type, filter } = {}
) => {
  switch (type) {
    case 'SET_VISIBILITY_FILTER':
      return filter;
    default:
      return state;
  }
};

export { getVisibilityFilter }
export default visibilityFilter;
