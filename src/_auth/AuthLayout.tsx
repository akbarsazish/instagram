import React from 'react';
import { Button } from '@/components/ui/button';
import { Navigate, Outlet } from 'react-router-dom';


function AuthLayout() {
   const isAuthenticated = false;

   return (
    <>
      {
      isAuthenticated ? (
      <Navigate to="/"/>
      ) : (
        <>
         <section>
          <Outlet />
        </section>
        </>
      )}
    </>
   )
}

export default AuthLayout
