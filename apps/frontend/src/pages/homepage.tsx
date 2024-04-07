// import { useState } from 'react';

import '../app.css';
import NavBar from '../components/navbar';
import QuestionList from '../components/questionlist';

function App() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <NavBar />
        <QuestionList />
      </div>
    </>
  );
}

export default App;
