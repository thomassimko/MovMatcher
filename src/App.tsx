import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Navbar } from './components/Navbar';
import { RenamePage } from './pages/RenamePage';
import { SettingsPage } from './pages/SettingsPage';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <div className="h-screen w-screen bg-gray-50">
      <Router>
        <Navbar />
        <div className="container m-12 ml-16">
          <Switch>
            <Route path="/search" component={SearchPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/" exact component={RenamePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
