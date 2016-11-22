function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  const subscribe = (listener) => (
    listeners.push(listener)
  );
  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((m, i) => {
        return i != action.index;
      })
    };
  } else {
    return state;
  }
}

const initialState = {
  messages: []
};

const store = createStore(reducer, initialState);

const App = React.createClass({
  componentDidMount: function() {
    store.subscribe(() => this.forceUpdate());
  },
  render: function() {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
});
