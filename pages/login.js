import React, { useState } from 'react';
import BaseLayout from '@/layouts/baseLayout';
import LoginForm from '@/components/forms/Login';
import { 
  useLoginUser
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
function login() {
  const [ signIn ] = useLoginUser();
  const [error, setError ] = useState(null);
  const router = useRouter();
  const login = (loginData) => {
    signIn(
      { variables: loginData }
    ).then(() => router.push('/'))
    .catch(err => { 
      console.log(err.message);
      setError(err.message) 
    });
  }
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
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
