import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import Client from './pages/Client';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Carriers from './pages/Carriers';
import Payment from './pages/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/page_accueil' exact element={<MainPage />} />
          <Route path='/clients' exact element={<Client />} />
          <Route path='/customers' exact element={<Customers />} />
          <Route path='/analytics' exact element={<Analytics />} />
          <Route path='/carriers' exact element={<Carriers />} />
          <Route path='/payment' exact element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
