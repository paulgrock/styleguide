'use strict';

import Routes from '../routes.jsx';
import Client from 'react-engine/lib/client';

require('../views/**/*.jsx', {
  glob: true
});

// boot options
const options = {
  // supply a function that can be called
  // to resolve the file that was rendered.
  routes: Routes,
  viewResolver: function(viewName) {
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  Client.boot(options);
});
