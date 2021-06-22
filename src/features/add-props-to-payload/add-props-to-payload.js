import { isEmpty } from 'lodash';

const addPropsToPayload = (props = {}) => {
  if (typeof props !== 'object' || isEmpty(props)) return;
  return (action = {}) => {
    if (typeof action !== 'object' || isEmpty(action)) return;
    const { payload } = action;
    return {
      ...action,
      payload: { ...payload, ...props }
    };
  };
};

export { addPropsToPayload };
