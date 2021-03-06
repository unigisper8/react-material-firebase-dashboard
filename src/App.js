import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { syncHistoryWithStore } from 'react-router-redux'
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { theme, themeWithRtl } from './theme';
import  store   from './store';
import routes from './routes';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookiesNotification from './components/CookiesNotification';
import ScrollReset from './components/ScrollReset';
import StylesProvider from './components/StylesProvider';
import DirectionToggle from './components/DirectionToggle';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/main.scss';

const history = syncHistoryWithStore(createBrowserHistory(), store);

function App() {
  const [direction, setDirection] = useState('ltr');

  const handleDirecitonToggle = () => {
    setDirection((prevDirection) => (prevDirection === 'ltr' ? 'rtl' : 'ltr'));
  };

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={direction === 'rtl' ? themeWithRtl : theme}>
        <StylesProvider direction={direction}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <ScrollReset />
              <GoogleAnalytics />
              <CookiesNotification />
              <DirectionToggle
                direction={direction}
                onToggle={handleDirecitonToggle}
              />
              {renderRoutes(routes)}
            </Router>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
