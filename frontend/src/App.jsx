import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div>
      <h1>Productos</h1>
      {!isLoggedIn && <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
      {isLoggedIn && <ProductForm />}
      <ProductList />
    </div>
  );
}

export default App;