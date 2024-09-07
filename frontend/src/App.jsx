// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<Users />} />
        <Route path="/edit/:id" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
