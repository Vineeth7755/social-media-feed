import React from 'react';
import Feed from './components/Feed';// Import the Feed component

const App = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Social Media Feed</h1>
      <Feed />
    </div>
  );
}

export default App;


