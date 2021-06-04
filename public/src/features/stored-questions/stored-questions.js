const myStorage = window.localStorage;

const storeQuestions = questions => myStorage.setItem('questions', JSON.stringify(questions));

const getStoredQuestions = () => JSON.parse(myStorage.getItem('questions'));

export { storeQuestions, getStoredQuestions };
