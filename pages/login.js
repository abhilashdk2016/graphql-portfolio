import React, { useState, useEffect, useRef } from 'react';
import BaseLayout from '@/layouts/baseLayout';
import LoginForm from '@/components/forms/Login';
import { 
  useLoginUser
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useRouter } from 'next/router';
import messages from '@/variables/messages';

function login() {
  const disposeId = useRef(null);
  const [ signIn ] = useLoginUser();
  const [error, setError ] = useState(null);
  const router = useRouter();
  const { message } = router.query;
  const login = (loginData) => {
    signIn(
      { variables: loginData }
    ).then(() => router.push('/'))
    .catch(err => { 
      console.log(err.message);
      setError(err.message) 
    });
  }

  const disposeMessage = () => router.replace('/login', '/login', { shallow: true });

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => { 
        disposeMessage();
      }, 3000);
    }
    return () => {
      clearTimeout(disposeId.current);
    } 
  }, [message]);
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            { message && <div className={`alert alert-${messages[message].status}`}>{messages[message].value}</div>}
            <LoginForm onSubmit={login} />
            {error && <div className="alert alert-danger">
              {error}
              </div>
            }
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(login, { getDataFromTree });
