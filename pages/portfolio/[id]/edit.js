import { useRouter } from 'next/router';
import BaseLayout from '@/layouts/baseLayout';
import PortfolioForm from '@/components/forms/PortfolioForm';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useGetPortfolio, useUpdatePortfolio } from '@/apollo/actions';
import { toast } from 'react-toastify';

function PortfolioEdit() {
  const { query } = useRouter();
  const { data } = useGetPortfolio({ variables: { id: query.id }});
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const errorMessage = error => {
    return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Ooooops something went wrong...'
  }

  const handlePortfolioUpdate = async data => {
    await updatePortfolio({
      variables: {
        id: query.id,
        ...data
      }
    });
    toast.success('Portfolio has been Updated', { autoClose: 3000 });
  }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            { data && <PortfolioForm initialData={data.portfolio} 
              onSubmit={handlePortfolioUpdate} />
            }
            { error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor']));
