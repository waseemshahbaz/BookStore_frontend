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
import GenresHome from './Components/GenresHome';
import AuthorsHome from './Components/AuthorsHome';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';

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
      
      {/* Public Pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      
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
      <Route path="/products/genres" element={
        <ProtectedRoute>
          <MainLayout>
            <GenresHome />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/products/authors" element={
        <ProtectedRoute>
          <MainLayout>
            <AuthorsHome />
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
