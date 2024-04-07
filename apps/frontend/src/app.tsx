import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage.tsx';
import LogInPage from './pages/login.tsx';
import SignUpPage from './pages/signup.tsx';

import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
