import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import Navbar from '@/components/shared/Navbar.js';
import Hero from '@/components/shared/Hero';
import Footer from '../components/shared/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className='portfolio-app'>
      <Navbar />
      {Component.name === 'Home' && <Hero />}
      <div className='container'>
        <Component {...pageProps} />
      </div>
      {Component.name === 'Home' && <Footer />}
    </div>
  );
};

export default MyApp;
