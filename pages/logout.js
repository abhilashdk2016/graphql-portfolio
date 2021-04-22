import React, { useState, useEffect } from 'react';
import BaseLayout from '@/layouts/baseLayout';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useSignOut } from '@/apollo/actions';
import { useRouter } from 'next/router';
function login({ apollo }) {
  const [ signOut ] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => router.push('/login'));
    })
  }, [])

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Signing out...</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(login, { getDataFromTree });
