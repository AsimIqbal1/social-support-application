import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { InitiateApplication } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/initiate-application/*"
          element={<InitiateApplication />}
        />
      </Routes>
    </Router>
  );
}

export default App;
