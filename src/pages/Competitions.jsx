import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import { FaTrophy } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Competitions = () => {
  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between relative overflow-hidden">
      <Helmet>
        <title>Monthly Competitions | ToyTopia</title>
      </Helmet>
      <header className="w-full relative z-10">
        <Header />
      </header>
      <main className="w-11/12 max-w-7xl mx-auto my-12 flex-grow relative z-10">
        <div className="flex flex-col items-center sm:items-start mb-8 text-center sm:text-left">
          <span className="text-[10px] font-extrabold bg-toy-primary-light text-toy-primary px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Challenges
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Monthly <span className="text-toy-primary">Competitions</span>
          </h1>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm">
          <EmptyState
            icon={FaTrophy}
            title="Monthly Quiz Winners & Competitions"
            description="Our monthly creative challenges and quizzes will be launched soon. Get ready to win exclusive toys!"
          />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Competitions;
