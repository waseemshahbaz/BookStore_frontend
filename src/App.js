import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductsHome from './Components/ProductsHome';
import Book from './Components/Book';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products">
        <Route index element={<ProductsHome />}></Route>
      </Route>
      <Route path="/book/:id" element={<Book />}></Route>
    </Routes>
  );
}

export default App;
