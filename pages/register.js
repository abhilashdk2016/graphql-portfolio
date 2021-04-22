import RegisterForm from '@/components/forms/Register';
import BaseLayout from '@/layouts/baseLayout';
import { 
  useRegisterUser
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import { useState } from 'react';
function register() {
  const [ signUp ] = useRegisterUser();
  const [error, setError ] = useState(null);
  const router = useRouter();
  const register = (registerData) => {
    signUp(
      { variables: registerData }
    ).then(() => router.push('/login'))
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
            <h1 className="page-title">Register </h1>
            <RegisterForm onSubmit={register} />
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

export default withApollo(register, { getDataFromTree });
