const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return;
    return JSON.parse(serializedState);
  } catch (err) {
    return;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore write errors for now
  }
}

export { loadState, saveState };
