import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { FaTrophy, FaCalendarCheck, FaCameraRetro, FaPaintBrush } from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const competitionsData = [
  {
    id: 1,
    title: "Epic LEGO Castle Build",
    icon: <FaTrophy className="text-toy-yellow" size={32} />,
    color: "bg-toy-yellow/10 border-toy-yellow/20",
    textColor: "text-yellow-700",
    description: "Build the most creative and massive LEGO castle you can imagine! Snap a clear photo of your creation.",
    deadline: "October 30th",
    prize: "$50 ToyTopia Gift Card",
  },
  {
    id: 2,
    title: "Draw Your Dream Toy",
    icon: <FaPaintBrush className="text-toy-primary" size={32} />,
    color: "bg-toy-primary-light/50 border-toy-primary/20",
    textColor: "text-toy-primary",
    description: "Unleash your inner designer! Draw what your ultimate dream toy would look like and what it can do.",
    deadline: "November 5th",
    prize: "Your drawing featured on our homepage!",
  },
  {
    id: 3,
    title: "Action Figure Photography",
    icon: <FaCameraRetro className="text-toy-secondary" size={32} />,
    color: "bg-toy-secondary/10 border-toy-secondary/20",
    textColor: "text-toy-secondary",
    description: "Take your action figures outside and capture them in an epic pose. Creativity is key!",
    deadline: "November 12th",
    prize: "A brand new Action Figure Set",
  }
];

const Competitions = () => {
  const [selectedComp, setSelectedComp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', link: '' });

  const handleOpenModal = (comp) => {
    setSelectedComp(comp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComp(null);
    setFormData({ name: '', age: '', link: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.link) {
      toast.error('Please fill out all fields!');
      return;
    }
    toast.success('Your awesome entry has been submitted! Good luck!');
    handleCloseModal();
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between relative overflow-hidden">
      <Helmet>
        <title>Monthly Competitions | ToyTopia</title>
      </Helmet>
      
      {/* Background Blobs */}
      <div className="absolute top-20 right-[-50px] w-80 h-80 rounded-full bg-toy-yellow/10 blur-3xl pointer-events-none animate-float-slow z-0"></div>

      <header className="w-full relative z-50">
        <Header />
      </header>

      <main className="w-11/12 max-w-7xl mx-auto my-12 flex-grow relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-[10px] font-extrabold bg-toy-primary-light text-toy-primary px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaTrophy size={14} /> Challenges
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 drop-shadow-sm">
            Monthly <span className="text-toy-primary">Competitions</span>
          </h1>
          <p className="text-slate-500 font-medium mt-3 max-w-xl">
            Join our creative challenges! Build, draw, and snap photos of your toys to win exclusive prizes and get featured on ToyTopia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitionsData.map((comp) => (
            <motion.div
              key={comp.id}
              whileHover={{ y: -5 }}
              className={`bg-white border-2 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between ${comp.color}`}
            >
              <div>
                <div className="bg-white p-3 rounded-2xl inline-block shadow-sm mb-6 border border-slate-100">
                  {comp.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${comp.textColor}`}>
                  {comp.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {comp.description}
                </p>
              </div>
              
              <div>
                <div className="bg-white/60 rounded-xl p-4 mb-6 border border-white">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaTrophy className="text-toy-yellow" />
                    Prize: <span className="text-toy-secondary">{comp.prize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FaCalendarCheck className="text-toy-mint" />
                    Deadline: <span className="text-slate-500">{comp.deadline}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(comp)}
                  className="w-full bg-slate-800 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <FaRegPaperPlane /> Submit Entry
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {isModalOpen && selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md relative z-10 border border-slate-100"
            >
              <div className="text-center mb-8">
                <div className="inline-block bg-toy-primary-light p-3 rounded-2xl text-toy-primary mb-4">
                  <FaRegPaperPlane size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 leading-tight">Submit to <br/> <span className="text-toy-primary">{selectedComp.title}</span></h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Child's First Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-toy-primary focus:ring-2 focus:ring-toy-primary/20 transition-all font-medium"
                    placeholder="e.g. Leo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    min="3"
                    max="15"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-toy-primary focus:ring-2 focus:ring-toy-primary/20 transition-all font-medium"
                    placeholder="e.g. 7"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Link to Photo/Video</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-toy-primary focus:ring-2 focus:ring-toy-primary/20 transition-all font-medium text-sm"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                  <p className="text-[10px] text-slate-400 font-semibold mt-1.5 ml-1">Please provide a public Google Drive or Image link.</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-toy-primary hover:bg-toy-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Competitions;
