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
         <section className='flex flex-1 justify-center items-center flex-col py-y'>
          <Outlet />
        </section>
        </>
      )}
    </>
   )
}

export default AuthLayout
