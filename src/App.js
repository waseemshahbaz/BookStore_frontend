import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductsHome from './Components/ProductsHome';
import Book from './Components/Book';
import EditBook from './Components/EditBook';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* Auth routes without header/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes with header/footer */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navbar />
            <Home />
          <Footer />
        </ProtectedRoute>
      } />
      <Route path="/products" element={
        <ProtectedRoute>
          <MainLayout>
            <ProductsHome />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/book/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <Book />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/book/add" element={
        <ProtectedRoute>
          <MainLayout>
            <Book addBook={true} />
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
