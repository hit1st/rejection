const buildAction = (type, payloadNames, payloadValues) => {
  if (!type || !payloadNames || !payloadValues) return;
  return payloadNames.reduce((action, payloadName, index) => (
    { ...action, [payloadName]: payloadValues[index] }
  ), { type });
};

const makeActionCreator = (type, ...payloadNames) => {
  if (!type || !payloadNames) return;
  return (...payloadValues) => buildAction(type, payloadNames, payloadValues);
};

const REJECTION_ADD_QUESTION = 'REJECTION::ADD_QUESTION'

const rejectionAddQuestion = makeActionCreator(REJECTION_ADD_QUESTION, 'payload');

export { buildAction, makeActionCreator, rejectionAddQuestion };

