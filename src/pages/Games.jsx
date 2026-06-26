import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import { FaGamepad } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Games = () => {
  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between relative overflow-hidden">
      <Helmet>
        <title>Fun Games | ToyTopia</title>
      </Helmet>
      <header className="w-full relative z-10">
        <Header />
      </header>
      <main className="w-11/12 max-w-7xl mx-auto my-12 flex-grow relative z-10">
        <div className="flex flex-col items-center sm:items-start mb-8 text-center sm:text-left">
          <span className="text-[10px] font-extrabold bg-toy-primary-light text-toy-primary px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Kids Arcade
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Interactive <span className="text-toy-primary">Games</span>
          </h1>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm">
          <EmptyState
            icon={FaGamepad}
            title="Interactive Games Coming Soon!"
            description="We're building an exciting arcade of mini-games where you can win ToyTopia points. Stay tuned!"
          />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Games;
