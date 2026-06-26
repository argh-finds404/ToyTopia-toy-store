import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGraduationCap, 
  FaPuzzlePiece, 
  FaRocket, 
  FaRedo, 
  FaArrowRight,
  FaCar,
  FaBrain,
  FaHelicopter,
  FaChild,
  FaShapes,
  FaStar
} from "react-icons/fa";

const AboutUs = () => {
  const navigate = useNavigate();
  const [toys, setToys] = useState([]);
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1: age, 2: style, 3: preference, 4: results
  const [answers, setAnswers] = useState({ age: "", style: "", preference: "" });
  const [recommendations, setRecommendations] = useState([]);

  // Fetch toys for quiz lookup
  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error loading toys:", err));
  }, []);

  const handleStartQuiz = () => {
    setQuizStep(1);
    setAnswers({ age: "", style: "", preference: "" });
    setRecommendations([]);
  };

  const handleSelectOption = (key, value) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    if (quizStep === 1) {
      setQuizStep(2);
    } else if (quizStep === 2) {
      setQuizStep(3);
    } else if (quizStep === 3) {
      generateRecommendations(nextAnswers);
      setQuizStep(4);
    }
  };

  const generateRecommendations = (finalAnswers) => {
    if (toys.length === 0) return;

    // Filter rules mapping choices to categoryIds
    let eligibleCategories = [];

    // Age rule
    if (finalAnswers.age === "toddler") {
      eligibleCategories.push(8); // Educational Toys
    } else if (finalAnswers.age === "preschool") {
      eligibleCategories.push(3, 4, 6); // Lego, Barbie, Excavator
    } else {
      eligibleCategories.push(1, 2, 5, 7, 10, 11); // Action, Hot Wheels, UNO, RC, Pokemon, Minecraft
    }

    // Play Style rule
    let styleCategories = [];
    if (finalAnswers.style === "creative") {
      styleCategories.push(3, 4, 11); // Lego, Barbie, Minecraft
    } else if (finalAnswers.style === "action") {
      styleCategories.push(1, 2, 6, 7); // Action figures, Hot Wheels, Construction, RC
    } else {
      styleCategories.push(5, 8, 9, 10); // UNO, Educational, Gifts, Pokemon
    }

    // Preference rule
    let preferenceCategories = [];
    if (finalAnswers.preference === "vehicles") {
      preferenceCategories.push(2, 6, 7); // Hot Wheels, Construction, RC
    } else if (finalAnswers.preference === "characters") {
      preferenceCategories.push(1, 4, 10, 11); // Transformers, Barbie, Pokemon, Minecraft
    } else {
      preferenceCategories.push(3, 5, 8); // Lego, UNO, Educational
    }

    // Find intersection or best overlap
    // Let's count matches per category
    const categoryScores = {};
    const allCandidates = [...eligibleCategories, ...styleCategories, ...preferenceCategories];
    allCandidates.forEach((catId) => {
      categoryScores[catId] = (categoryScores[catId] || 0) + 1;
    });

    // Sort categories by score descending
    const sortedCategories = Object.keys(categoryScores)
      .map(Number)
      .sort((a, b) => categoryScores[b] - categoryScores[a]);

    // Get toys from top matching categories
    const topCategories = sortedCategories.slice(0, 3);
    const matches = toys.filter((toy) => topCategories.includes(toy.categoryId));

    // Shuffle and pick top 3
    const shuffled = matches.sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 3));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Brand Journey Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
          Welcome to ToyTopia
        </span>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-2">
          Where Every Day is <span className="text-toy-secondary">Play Day!</span>
        </h1>
        <p className="text-gray-500 mt-4 leading-relaxed">
          Founded in 2020, ToyTopia was born from a simple dream: to bring wholesome, imaginative, and screen-free play back to childhood. We believe that toys are not just objects, but tools that foster curiosity, develop cognitive skills, and build lifelong friendships.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-toy-primary/10 text-toy-primary flex items-center justify-center rounded-2xl mx-auto mb-4">
            <FaGraduationCap size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Learning Through Play</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every toy in our catalog is hand-picked to stimulate cognitive growth, logical thinking, and motor skills.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-toy-secondary/10 text-toy-secondary flex items-center justify-center rounded-2xl mx-auto mb-4">
            <FaPuzzlePiece size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Safe & Sustainable</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            We partner with certified global makers to ensure non-toxic materials, smooth edges, and eco-friendly packaging.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-toy-yellow/10 text-[#d48c00] flex items-center justify-center rounded-2xl mx-auto mb-4">
            <FaRocket size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Infinite Imagination</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Our toys promote open-ended adventure. Watch your child build castles, explore space, and create magical worlds!
          </p>
        </div>
      </div>

      {/* Interactive Toy Finder Quiz Module */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-toy-primary to-[#707cff] text-white p-8 text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-12"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>

          <h2 className="text-2xl sm:text-3xl font-extrabold relative z-10 flex items-center justify-center gap-2">
            <FaPuzzlePiece className="animate-pulse" /> The Magic Toy Finder Quiz
          </h2>
          <p className="text-sm text-white/80 mt-2 relative z-10">
            Not sure what toy to pick? Answer 3 fun questions and let our magic matching engine decide!
          </p>
        </div>

        <div className="p-8 min-h-[350px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {quizStep === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl text-toy-secondary flex justify-center"><FaRocket className="animate-bounce" /></div>
                <h3 className="text-xl font-bold text-gray-800">Ready to find the perfect toy match?</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                  We'll customize suggestions based on child age, favorite play type, and core interests. It takes less than 30 seconds!
                </p>
                <button
                  onClick={handleStartQuiz}
                  className="bg-toy-secondary hover:bg-toy-secondary/90 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-toy-secondary/20 active:scale-95 transition-all text-sm flex items-center gap-2 mx-auto cursor-pointer"
                >
                  Start The Quiz <FaArrowRight size={12} />
                </button>
              </motion.div>
            )}

            {quizStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-2.5 py-1 rounded-lg uppercase">Question 1 of 3</span>
                  <h3 className="text-xl font-extrabold text-gray-800 mt-2">Who is the lucky child?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
                  <button
                    onClick={() => handleSelectOption("age", "toddler")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-primary group-hover:scale-110 transition-transform"><FaChild /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Toddler</h4>
                    <p className="text-xs text-gray-400 mt-1">Age 0 - 2 Years</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("age", "preschool")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-secondary group-hover:scale-110 transition-transform"><FaGraduationCap /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Preschooler</h4>
                    <p className="text-xs text-gray-400 mt-1">Age 3 - 5 Years</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("age", "bigkid")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-yellow group-hover:scale-110 transition-transform"><FaRocket /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Big Kid</h4>
                    <p className="text-xs text-gray-400 mt-1">Age 6+ Years</p>
                  </button>
                </div>
              </motion.div>
            )}

            {quizStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-2.5 py-1 rounded-lg uppercase">Question 2 of 3</span>
                  <h3 className="text-xl font-extrabold text-gray-800 mt-2">What is their play personality?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
                  <button
                    onClick={() => handleSelectOption("style", "creative")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-primary group-hover:scale-110 transition-transform"><FaPuzzlePiece /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Creative Creator</h4>
                    <p className="text-xs text-gray-400 mt-1">Loves Lego, Crafts & Stories</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("style", "action")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-secondary group-hover:scale-110 transition-transform"><FaCar /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Action Explorer</h4>
                    <p className="text-xs text-gray-400 mt-1">Loves Vehicles, Action & Speed</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("style", "thinker")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-mint group-hover:scale-110 transition-transform"><FaBrain /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Mind Thinker</h4>
                    <p className="text-xs text-gray-400 mt-1">Loves Puzzles, Cards & Logic</p>
                  </button>
                </div>
              </motion.div>
            )}

            {quizStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-2.5 py-1 rounded-lg uppercase">Question 3 of 3</span>
                  <h3 className="text-xl font-extrabold text-gray-800 mt-2">What visual themes excite them most?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
                  <button
                    onClick={() => handleSelectOption("preference", "vehicles")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-primary group-hover:scale-110 transition-transform"><FaHelicopter /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Machines & Tech</h4>
                    <p className="text-xs text-gray-400 mt-1">Planes, Trains & Controllers</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("preference", "characters")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-secondary group-hover:scale-110 transition-transform"><FaChild /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Heroes & Animals</h4>
                    <p className="text-xs text-gray-400 mt-1">Superheroes, Anime & Dolls</p>
                  </button>
                  <button
                    onClick={() => handleSelectOption("preference", "puzzles")}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-toy-primary bg-white hover:bg-toy-primary-light/10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl mb-2 text-toy-yellow group-hover:scale-110 transition-transform"><FaShapes /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Shapes & Numbers</h4>
                    <p className="text-xs text-gray-400 mt-1">Blocks, Cards & Matching</p>
                  </button>
                </div>
              </motion.div>
            )}

            {quizStep === 4 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-center"
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-toy-mint bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    Match Found!
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-800">We Picked These Just For You!</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                    Recommended based on {answers.age === "toddler" ? "Toddler" : answers.age === "preschool" ? "Preschool" : "Big Kid"} traits.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 justify-items-center">
                  {recommendations.length > 0 ? (
                    recommendations.map((toy) => (
                      <div
                        key={toy.toyId}
                        className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between max-w-[240px]"
                      >
                        <div>
                          <img
                            src={toy.pictureURL}
                            alt={toy.toyName}
                            className="w-full h-32 object-cover rounded-xl mb-3"
                          />
                          <h4 className="font-bold text-gray-800 text-sm line-clamp-1 mb-0.5">
                            {toy.toyName}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase">
                            {toy.subCategory}
                          </p>
                          <div className="flex justify-between items-center my-2 text-xs">
                            <span className="text-toy-teal font-extrabold">${toy.price}</span>
                            <span className="text-toy-yellow font-bold flex items-center gap-0.5">
                              <FaStar size={10} /> {toy.rating}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/toys-details/${toy.toyId}`)}
                          className="w-full text-center text-white bg-toy-primary hover:bg-toy-primary/95 text-xs font-bold py-2 rounded-xl active:scale-95 transition-all shadow-sm shadow-toy-primary/10 cursor-pointer mt-1"
                        >
                          View Details
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-gray-400 py-6 text-sm">
                      Searching the sandbox for matching toys...
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleStartQuiz}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl transition-all text-xs flex items-center gap-2 mx-auto active:scale-95 cursor-pointer"
                  >
                    <FaRedo size={10} /> Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
