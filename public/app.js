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

const MessageInput = React.createClass({
  handleSubmit: function(){
    this.sendMessage();
  },
  sendMessage: function() {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.refs.messageInput.value
    });

    this.refs.messageInput.value = '';
  },
  render: function() {
    return (
      <div className='ui input'>
        <input
          ref='messageInput'
          type='text'
        >
        </input>
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
});

const MessageView = React.createClass({
  handleClick: function(index) {
    this.deleteMessage(index);
  },
  deleteMessage: function(index) {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index
    });
  },
  render: function() {
    const messages = this.props.messages.map((m, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(index)}
      >
        {m}
      </div>
    ));
    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
