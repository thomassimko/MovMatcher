import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Alert } from '@material-ui/lab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import { Navbar } from './components/Navbar';
import { RenamePage } from './pages/RenamePage';
import { SettingsPage } from './pages/SettingsPage';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  const [hideTMDBInfo, setHideTMDBInfo] = useState<boolean>(false);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#F87171',
        contrastText: '#FFFFFF',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-screen bg-gray-50">
        <Router>
          <Navbar />
          <div className="ml-16 p-4 h-full flex flex-col">
            <Collapse in={!hideTMDBInfo}>
              <Alert
                severity="info"
                onClose={() => setHideTMDBInfo(true)}
                className="mb-2"
              >
                This product uses the TMDb API but is not endorsed or certified
                by TMDb.
              </Alert>
            </Collapse>

            <Switch>
              <Route path="/search" component={SearchPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/" exact component={RenamePage} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}
