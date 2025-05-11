import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import InventoryPage from './pages/InventoryPage';
import NavBar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002366', // Navy blue
    },
    secondary: {
      main: '#B0B3B8', // Light gray
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<InventoryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;