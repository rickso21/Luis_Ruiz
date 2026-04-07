import React from 'react';
//import Header from './components/Header';
//import HomePage from './pages/HomePage';
import MessageFeed from './components/MessageFeed';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App: React.FC = () => {
  return (
<div className="App">
      <Toaster position="top-right" />
      <MessageFeed />
    </div>
  );
};

export default App;