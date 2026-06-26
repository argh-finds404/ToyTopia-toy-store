import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { FaRedoAlt, FaTrophy, FaStar, FaGamepad, FaRobot, FaCar, FaPuzzlePiece, FaTrain, FaHelicopter, FaPaintBrush, FaSpaceShuttle, FaGuitar, FaBrain, FaMedal } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Custom Hook for Points ---
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// --- Memory Match Game Component ---
const MemoryMatch = ({ points, setPoints }) => {
  const toyIcons = [FaRobot, FaCar, FaPuzzlePiece, FaTrain, FaHelicopter, FaPaintBrush, FaSpaceShuttle, FaGuitar];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedThisTurn, setMatchedThisTurn] = useState(null);

  const initializeGame = () => {
    const shuffledCards = [...toyIcons, ...toyIcons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({ id: index, icon: Icon }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setMatchedThisTurn(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => {
        if (cards[flipped[0]].icon === cards[flipped[1]].icon) {
          setSolved((prev) => [...prev, flipped[0], flipped[1]]);
          setMatchedThisTurn(flipped[1]);
          setPoints((p) => p + 10);
          setTimeout(() => setMatchedThisTurn(null), 1500);
        } else {
          // Optional: penalty for wrong guess to make it gamified
          setPoints((p) => Math.max(0, p - 1));
        }
        setFlipped([]);
        setMoves((prev) => prev + 1);
      }, 800);
    }
  }, [flipped, cards, setPoints]);

  const handleCardClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !solved.includes(index)) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const isGameWon = solved.length === cards.length && cards.length > 0;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FaPuzzlePiece className="text-toy-primary"/> Toy Match-Up</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Moves: {moves}</p>
        </div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-2 bg-toy-primary-light text-toy-primary px-4 py-2 rounded-xl font-bold hover:bg-toy-primary hover:text-white transition-colors active:scale-95 shadow-sm"
        >
          <FaRedoAlt /> Restart
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isGameWon ? (
          <motion.div 
            key="win"
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="text-center py-12 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-7xl mb-4 text-toy-yellow flex justify-center drop-shadow-lg"
            >
              <FaTrophy />
            </motion.div>
            <h3 className="text-4xl font-extrabold text-slate-800 mb-2">You Won!</h3>
            <p className="text-slate-500 mb-2 font-medium">Amazing! You found all the toys in {moves} moves.</p>
            <p className="text-toy-teal font-extrabold text-lg mb-8">+50 Bonus Points!</p>
            <button
              onClick={() => {
                setPoints((p) => p + 50);
                initializeGame();
              }}
              className="bg-toy-primary text-white font-bold px-8 py-3.5 rounded-2xl shadow-md hover:bg-toy-primary/90 transition-all active:scale-95 text-lg"
            >
              Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="board"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-4 gap-3 sm:gap-4 relative z-10"
          >
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || solved.includes(index);
              return (
                <div key={card.id} className="aspect-square relative cursor-pointer" onClick={() => handleCardClick(index)}>
                  <AnimatePresence mode="wait">
                    {isFlipped ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-slate-50 border-4 border-toy-mint rounded-2xl flex items-center justify-center text-4xl sm:text-5xl text-toy-primary shadow-sm"
                      >
                        <card.icon />
                        {matchedThisTurn === index && (
                          <motion.div 
                            initial={{ y: 0, opacity: 1, scale: 0.5 }} 
                            animate={{ y: -60, opacity: 0, scale: 1.5 }} 
                            transition={{ duration: 1, ease: "easeOut" }} 
                            className="absolute text-toy-teal font-extrabold text-2xl drop-shadow-md z-20 pointer-events-none"
                          >
                            +10
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-toy-primary rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-toy-primary-light shadow-md"
                      >
                        ?
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Trivia Quiz Component ---
const TriviaQuiz = ({ points, setPoints }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const decodeEntity = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple');
      const data = await res.json();
      
      const formattedQuestions = data.results.map((q) => {
        const question = decodeEntity(q.question);
        const answer = decodeEntity(q.correct_answer);
        const incorrect = q.incorrect_answers.map(a => decodeEntity(a));
        
        const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
        return { q: question, options, answer };
      });
      
      setQuestions(formattedQuestions);
      setCurrentQ(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    const correct = option === questions[currentQ].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setPoints((p) => p + 20);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
        <FaBrain className="text-6xl text-toy-secondary animate-pulse mb-4" />
        <h3 className="text-xl font-bold text-slate-700">Loading new questions...</h3>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const progressPercentage = ((currentQ) / questions.length) * 100;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div 
            key="score"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-10"
          >
            {score === questions.length ? (
              <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring" }}>
                <FaMedal className="text-7xl text-toy-teal mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2 text-toy-teal">Master Builder!</h2>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <FaStar className="text-7xl text-toy-yellow mx-auto mb-4 drop-shadow-lg animate-spin-slow" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Quiz Complete!</h2>
              </motion.div>
            )}
            <p className="text-xl text-slate-600 font-bold mb-8">You scored {score} out of {questions.length}</p>
            <button onClick={fetchQuestions} className="bg-toy-secondary text-white font-bold px-8 py-3.5 rounded-2xl shadow-md hover:bg-toy-secondary/90 transition-all active:scale-95 text-lg">
              Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
              <motion.div 
                className="bg-toy-secondary h-3 rounded-full" 
                initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                animate={{ width: `${((currentQ + (selectedAnswer ? 1 : 0)) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            <div className="mb-6 flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-2"><FaBrain className="text-toy-secondary" size={16}/> Question {currentQ + 1} of {questions.length}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
              {questions[currentQ].q}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {questions[currentQ].options.map((option, idx) => {
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-toy-primary-light hover:border-toy-primary hover:text-toy-primary";
                if (selectedAnswer === option) {
                  btnStyle = isCorrect ? "bg-toy-mint text-white border-toy-mint shadow-md" : "bg-red-500 text-white border-red-500 shadow-md";
                } else if (selectedAnswer && option === questions[currentQ].answer) {
                  btnStyle = "bg-toy-mint/20 border-toy-mint text-toy-mint";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`border-2 py-4 px-6 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center relative overflow-hidden ${btnStyle} ${selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="relative z-10">{option}</span>
                    {selectedAnswer === option && isCorrect && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 1 }} 
                        animate={{ scale: 2, opacity: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-white/40 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
              
              {/* Floating Point Notification for Correct Answer */}
              <AnimatePresence>
                {selectedAnswer && isCorrect && (
                  <motion.div
                    initial={{ y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ y: -80, opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-toy-mint font-extrabold text-4xl drop-shadow-lg z-20 pointer-events-none"
                  >
                    +20
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Games = () => {
  const [activeTab, setActiveTab] = useState('memory');
  const [points, setPoints] = useStickyState(0, "toytopia_points");

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between relative overflow-hidden">
      <Helmet>
        <title>Fun Games Arcade | ToyTopia</title>
      </Helmet>
      
      {/* Background Blobs */}
      <div className="absolute top-20 left-[-50px] w-80 h-80 rounded-full bg-toy-primary/10 blur-3xl pointer-events-none animate-float-slow z-0"></div>
      <div className="absolute bottom-20 right-[-50px] w-96 h-96 rounded-full bg-toy-secondary/10 blur-3xl pointer-events-none animate-float-reverse z-0"></div>

      <header className="w-full relative z-50">
        <Header />
      </header>

      <main className="w-11/12 max-w-7xl mx-auto my-8 sm:my-12 flex-grow relative z-10">
        
        {/* Header Area with Points Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[10px] font-extrabold bg-toy-primary-light text-toy-primary px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaGamepad size={14} /> Kids Arcade
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 drop-shadow-sm">
              Play & <span className="text-toy-primary">Learn</span>
            </h1>
            <p className="text-slate-500 font-medium mt-3 max-w-md">
              Earn ToyTopia Points by playing games! Save up points to become a Master Builder.
            </p>
          </div>

          {/* Points Display */}
          <motion.div 
            key={points}
            initial={{ scale: 1.1, backgroundColor: "#fffbeb" }}
            animate={{ scale: 1, backgroundColor: "#ffffff" }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-toy-yellow/30 p-4 rounded-3xl shadow-sm flex items-center gap-4 min-w-[200px]"
          >
            <div className="bg-toy-yellow/20 p-3 rounded-2xl text-toy-yellow">
              <FaStar size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Score</p>
              <p className="text-3xl font-extrabold text-slate-800 leading-none">{points} <span className="text-sm font-bold text-toy-yellow">TP</span></p>
            </div>
          </motion.div>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 inline-flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'memory' ? 'bg-toy-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <FaPuzzlePiece /> Memory Match
            </button>
            <button
              onClick={() => setActiveTab('trivia')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'trivia' ? 'bg-toy-secondary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <FaBrain /> Toy Trivia
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'memory' ? (
            <MemoryMatch points={points} setPoints={setPoints} />
          ) : (
            <TriviaQuiz points={points} setPoints={setPoints} />
          )}
        </motion.div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Games;
