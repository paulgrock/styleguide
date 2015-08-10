import React from 'react';
import Layout from './layout.jsx';
import Wrapper from './smart-component.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../js/reducers';
const store = createStore(reducers);

const App = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    _csrf: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <Layout>
        <h1>{this.props.title}</h1>
          <Provider store={store}>
            {() =>
              <Wrapper {...this.props} />
            }
          </Provider>
      </Layout>
    );
  }
});

export default App;
