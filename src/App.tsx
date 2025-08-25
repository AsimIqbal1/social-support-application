import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, InitiateApplication } from '@/pages';
import { ROUTES } from '@/constants';
import { Navbar } from '@/components';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME.path} element={<HomePage />} />
        <Route
          path={ROUTES.INITIATE_APPLICATION.path}
          element={<InitiateApplication />}
        />
      </Routes>
    </Router>
  );
}

export default App;
