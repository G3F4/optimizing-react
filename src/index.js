import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const rootEl = document.getElementById('root');

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, rootEl);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(<MuiThemeProvider><NextApp /></MuiThemeProvider>, rootEl)
  })
}
