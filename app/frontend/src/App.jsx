import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MajorPage from './pages/MajorPage';
import SpecificMajorPage from './pages/SpecificMajorPage';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/major' element={<MajorPage />} />
          <Route path='/major/:specificMajor' element={<SpecificMajorPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
