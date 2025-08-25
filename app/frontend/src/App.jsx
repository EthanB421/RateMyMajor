import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CollegePage from './pages/CollegePage';
import SpecificCollegePage from './pages/SpecificCollegePage';
import AddReviewPage from './pages/AddReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import MyReviewsPage from './pages/MyReviewsPage';
import ScrollTop from './components/ScrollTop';
import './styles/index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from './pages/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff59d',
      main: '#fff176',
      dark: '#fdd835',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Navbar />
          <div className='main-content'>
            <Routes>
              <Route
                path='/college/add-review/:collegeId'
                element={<AddReviewPage />}
              />
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/college' element={<CollegePage />} />
              <Route
                path='/college/:specificCollege'
                element={<SpecificCollegePage />}
              />
              <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
              <Route path='terms-of-service' element={<TermsOfServicePage />} />
              <Route path='college/add-review' element={<AddReviewPage />} />
              <Route path='/my-reviews' element={<MyReviewsPage />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
