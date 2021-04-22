import React, { useState } from 'react'
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import withAuth from '@/hoc/withAuth';
const secret = withAuth(() => {
  
  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">SECRET</h1>
            Secret Page only authenticated users allowed!
          </div>
        </div>
      </div>
    </>
  )
}, ['admin']);

export default withApollo(secret, { getDataFromTree });
