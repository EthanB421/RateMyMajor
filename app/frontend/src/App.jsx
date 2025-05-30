import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
