import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import Customers from './pages/Customers';
import { useState } from 'react';
import CustomersProfile from './pages/CustomersProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/page_accueil' exact element={<MainPage />} />
          <Route path='/clients' exact element={<Customers />} />
          <Route path='/profil_client/id=:id' exact element={<CustomersProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
