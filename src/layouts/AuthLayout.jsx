import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between">
        <ScrollToTop />
        <div>
          <header>
            <Header></Header>
          </header>
          <main className="w-11/12 max-w-7xl mx-auto py-6">
            <Outlet></Outlet>
          </main>
        </div>
        <Footer />
      </div>
    );
};

export default AuthLayout;