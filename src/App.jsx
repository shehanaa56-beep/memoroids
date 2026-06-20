import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MemoroidsInfo from './components/MemoroidsInfo';
/* import ImageSlider from './components/ImageSlider'; */
import Shop from './components/Shop';
import About from './components/About';
import Reviews, { DraggableCardDemo } from './components/Reviews';
import CustomOrders from './components/CustomOrders';
import Join from './components/Join';
import Moving from './components/Moving';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import InstallBanner from './components/InstallBanner';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MemoroidsInfo />
            {/* <ImageSlider /> */}
            <ProductCategories />
            <Join />
            <Moving />
            <Testimonials />
            <DraggableCardDemo />
            {/*<Subscription />*/}
          </>
        } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/custom-orders" element={<CustomOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      <InstallBanner />
    </div>
  );
}

export default App;
