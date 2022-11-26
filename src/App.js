import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Orders from './pages/Orders';
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
          <Route path='/products' exact element={<Products />} />
          <Route path='/orders' exact element={<Orders />} />
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
