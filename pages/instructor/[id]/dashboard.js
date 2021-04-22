import React, { useState } from 'react';
import BaseLayout from '@/layouts/baseLayout';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { useGetUserPortfolios, useDeletePortfolio } from '@/apollo/actions';
import Link from 'next/link';
import { formatDate } from '@/utils/functions';

function Dashboard() {
  const { data } = useGetUserPortfolios();
  const [deletePortfolio ] = useDeletePortfolio();
  const userPotfolios = (data && data.userPortfolios) || [];
  const router = useRouter();
  
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Instructor Portfolios</h1>
            {
              userPotfolios.map(portfolio => <Card key={portfolio._id} className="mb-2">
                <Card.Header>
                  {portfolio.jobTitle}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{portfolio.title}</Card.Title>
                  <Card.Text>
                  {formatDate(portfolio.startDate)} - {portfolio.endDate ? formatDate(portfolio.endDate) : "Present"}
                  </Card.Text>
                  <Link href="/portfolio/[id]/edit" as={`/portfolio/${portfolio._id}/edit`}>
                    <a className="btn btn-warning mr-1">Update</a>
                  </Link>
                  <Button variant="danger" onClick={() => deletePortfolio({ variables: { id: portfolio._id }})}>Delete</Button>
                </Card.Body>
              </Card>)
            }
            
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(withAuth(Dashboard, ['admin', 'instructor'], { ssr: true }), { getDataFromTree });
