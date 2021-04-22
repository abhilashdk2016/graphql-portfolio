import React, { useState } from 'react';
import BaseLayout from '@/layouts/baseLayout';
import PortfolioForm from '@/components/forms/PortfolioForm';
import { 
  useCreatePortfolio
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';

function PortfolioCreate() {
  const router = useRouter();
  const [createPortfolio, { error }] = useCreatePortfolio();
  const errorMessage = error => {
    return (error.graphQLErrors.length > 0 && error.graphQLErrors[0].message) || 'Ooooops something went wrong...'
  }
  const handleCreatePortfolio = async (data) => {
    await createPortfolio({variables: data});
    router.push('/portfolio');
  }
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create new Portfolio</h1>
            <PortfolioForm onSubmit={handleCreatePortfolio} />
            { error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(withAuth(PortfolioCreate, ['admin', 'instructor']));
