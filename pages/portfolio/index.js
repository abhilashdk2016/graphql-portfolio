import Link from 'next/link';
import BaseLayout from '@/layouts/baseLayout';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import { 
  useGetPortfolios
} from '../../apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const Portfolio = () => {
  const { data } = useGetPortfolios();
  const portfolios = (data && data.portfolios) || [];
  return (
    <BaseLayout>
    <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Portfolios</h1>
            </div>
          </div>
        </section>
        <section className="pb-5">
          <div className="row">
            { portfolios.map(portfolio => 
              <div className="col-md-4" key={portfolio._id}>
                <Link href='/portfolio/[id]'
                    as={`/portfolio/${portfolio._id}`}>
                  <a className="card-link">
                      <PortfolioCard portfolio={portfolio} />
                  </a>
                </Link>
              </div>)
            }
          </div>
        </section>
    </BaseLayout>
  )
}

export default withApollo(Portfolio, { getDataFromTree });
