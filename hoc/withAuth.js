import { useGetUser } from '@/apollo/actions';
import Redirect from '@/components/shared/Redirect';
export default function withAuth(WrappedComponent, role, options = { ssr: false }) {
  function innerFunction (props) {
  
  const { data: { user } = { }, loading, error } = useGetUser({ fetchPolicy: 'network-only' });

  if (
    !loading && 
    (!user || error ) &&
    typeof window !== 'undefined'
  ) {
    return <Redirect to="/login" />
  }
  
  if (user) {
    if (role && !role.includes(user.role)) {
      return <Redirect to="/login" />
    }
    return <WrappedComponent {...props} />
  }

  return <div>Authenticating...</div>
  }

  if(options.ssr) {
    const serverRedirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    }
    innerFunction.getInitialProps = async (context) => {
      const { req, res } = context;

      if(req) {
        const { user } = req;
        if(!user) {
          return serverRedirect(res, '/login');
        }

        if (role && !role.includes(user.role)) {
          return serverRedirect(res, '/login');
        }
      }

      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(context);
      return { ...pageProps };
    }
  }

  return innerFunction;
} 