function createStore(reducer, initialState) {
  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return state.messages.concat(action.message);
  } else {
    return state;
  }
}

const initialState = {
  message: []
};

const store = createStore(reducer, initialState);
