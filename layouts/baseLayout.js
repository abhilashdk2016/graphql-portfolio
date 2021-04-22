import NavBar from '@/components/shared/NavBar';
import Hero from '@/components/shared/Hero';
import { ToastContainer, toast } from 'react-toastify';

const BaseLayout = ({children, page = ''}) => {
  return (
    <div className="portfolio-app">
      <NavBar />
      {page === 'Home' && <Hero />}
      <div className="container">
        {children}
      </div>
      { page === 'Home' && <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
        <div className="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
      </footer> }
      <ToastContainer />
    </div>
  )
}

// BaseLayout.getInitialProps = async (context) => {
//   debugger
//   let initialProps = App.getInitialProps && await App.getInitialProps(context);
//   return {
//     pageProps : { appData: "Hello _app component", ...initialProps.pageProps }
//   };
// }

export default BaseLayout;
