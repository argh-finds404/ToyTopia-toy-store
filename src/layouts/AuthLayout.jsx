import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
      <div className="bg-[#e5e5e5] min-h-screen">
        <header>
          <Header></Header>
        </header>
        <main className="w-11/12 max-w-7xl mx-auto py-6">
          <Outlet></Outlet>
        </main>
      </div>
    );
};

export default AuthLayout;