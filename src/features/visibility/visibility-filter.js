const showAll = () => 'SHOW_ALL';
const showAccepted = () => 'SHOW_ACCEPTED';
const showRejected = () => 'SHOW_REJECTED';

const setVisibilityFilter = filter => !filter ?
  filter : 
  {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };

const getVisibilityFilter = state => state ? state.visibilityFilter : undefined;

const visibilityFilter = (
  state = showAll(),
  { type, filter } = {}
) => {
  switch (type) {
    case 'SET_VISIBILITY_FILTER':
      return filter;
    default:
      return state;
  }
};

export default visibilityFilter;
export {
  getVisibilityFilter,
  setVisibilityFilter,
  showAll,
  showAccepted,
  showRejected
};
