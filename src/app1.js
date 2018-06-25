import React, { Component } from 'react';
import {createStore} from 'redux';
import Chat from './Chat';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Chat />
      </Provider>
    );
  }
}

export default App;
