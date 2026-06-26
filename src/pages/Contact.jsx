import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Are your toys safe for toddlers under 3 years old?",
    answer: "Yes, absolutely! We label all toys suitable for toddlers with explicit safety tags. In addition, all items in our Educational Toys category are strictly checked for non-toxic paint, rounded edges, and no small detachable parts that could pose a choking hazard."
  },
  {
    question: "Do you ship worldwide or only inside Bangladesh?",
    answer: "We offer express shipping inside Bangladesh (DHK is 24-48h, other districts are 3-4 days). International shipping is currently available for selected Southeast Asian countries by request through our contact email."
  },
  {
    question: "What is your return policy for damaged items?",
    answer: "We offer a 100% Free Return Policy for 365 days. If a toy arrives damaged or has a missing piece, simply contact us here with your order ID, and we will dispatch a replacement courier to swap the item at no cost to you."
  },
  {
    question: "Can I customize the color or design of a toy?",
    answer: "Some wooden block sets and plush toys have color/theme options visible on their detail page. For customized orders, you can reach out directly via email, and our custom toy builders will do their best to help!"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Confetti Particle Simulation
  useEffect(() => {
    if (!showConfetti) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ["#5c67f2", "#ff7e67", "#feca57", "#2ed573", "#ff6b81", "#a55eea"];

    // Initialize particles (some balloon-like circles, some standard confetti squares)
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200, // start below screen
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 3 + 2),
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        type: Math.random() > 0.4 ? "balloon" : "confetti",
        opacity: 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.5; // slight sway
        p.rotation += p.rotationSpeed;

        if (p.y < -50) {
          // Reset at bottom or fade out
          p.opacity -= 0.01;
        }

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.type === "balloon") {
            // Draw balloon shape
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 1.3, 0, 0, Math.PI * 2);
            ctx.fill();
            // Draw small knot at bottom
            ctx.beginPath();
            ctx.moveTo(0, p.size * 1.3);
            ctx.lineTo(-3, p.size * 1.3 + 4);
            ctx.lineTo(3, p.size * 1.3 + 4);
            ctx.closePath();
            ctx.fill();
          } else {
            // Draw square confetti
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          }
          ctx.restore();
        }
      });

      if (alive) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setShowConfetti(false);
      }
    };

    animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Auto terminate after 6 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [showConfetti]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate database send
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfetti(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      {/* Confetti Canvas overlay */}
      {showConfetti && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[200] pointer-events-none w-full h-full"
        />
      )}

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-2">
          Let's Hear Your <span className="text-toy-secondary">Toy Stories!</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Have a question about shipping, a product, or customization? Send us a letter or check the FAQs below.
        </p>
      </div>

      {/* Info & Form Flex Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-toy-primary/10 text-toy-primary flex items-center justify-center flex-shrink-0">
              <FaPhoneAlt size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-800 text-sm">Ring Our Bell</h4>
              <p className="text-xs text-gray-400 mt-0.5">Available Mon-Fri, 9am - 6pm</p>
              <p className="text-sm text-toy-primary font-bold mt-2">+880 1799 884404</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-toy-secondary/10 text-toy-secondary flex items-center justify-center flex-shrink-0">
              <FaEnvelope size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-800 text-sm">Send a Postcard</h4>
              <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
              <p className="text-sm text-toy-secondary font-bold mt-2">hello@toytopia-shop.com</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-toy-mint/10 text-toy-mint flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-800 text-sm">Visit The Toybox</h4>
              <p className="text-xs text-gray-400 mt-0.5">Our flagship store location</p>
              <p className="text-sm text-toy-mint font-bold mt-2">Level 4, Toytopia Plaza, Banani, Dhaka</p>
            </div>
          </div>

          {/* Interactive Map card */}
          <div className="h-44 bg-slate-100 rounded-3xl border border-slate-100 overflow-hidden relative shadow-inner flex items-center justify-center group select-none">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            {/* Illustrative Map graphic */}
            <div className="text-center z-10 p-4">
              <div className="w-8 h-8 rounded-full bg-toy-accent text-white flex items-center justify-center mx-auto mb-2 animate-bounce">
                📍
              </div>
              <p className="text-xs font-bold text-gray-800">ToyTopia Flagship Map</p>
              <p className="text-[10px] text-gray-400">Click to open Google Maps navigation</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white border border-slate-100 p-8 rounded-3xl shadow-lg relative">
          <AnimatePresence mode="wait">
            {!showConfetti ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-gray-800">Send an Instant Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Teddy Bear"
                      className="bg-slate-50 border border-slate-100 focus:border-toy-primary rounded-xl px-4 py-2.5 outline-none text-sm text-gray-700 transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="teddy@play.com"
                      className="bg-slate-50 border border-slate-100 focus:border-toy-primary rounded-xl px-4 py-2.5 outline-none text-sm text-gray-700 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Message Description</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what's on your mind..."
                    rows="5"
                    className="bg-slate-50 border border-slate-100 focus:border-toy-primary rounded-xl p-4 outline-none text-sm text-gray-700 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-toy-primary hover:bg-toy-primary/95 disabled:bg-slate-300 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-toy-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <FaPaperPlane size={12} />
                  {isSubmitting ? "Sending Box..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="text-7xl animate-bounce">🎈🥳</div>
                <h3 className="text-2xl font-extrabold text-toy-primary">Message Dispatched!</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                  Yay! Your letter has been packed with helium and floated straight to our toy factory. We will review it and reply within 24 hours!
                </p>
                <button
                  onClick={() => setShowConfetti(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl transition-all text-xs cursor-pointer active:scale-95"
                >
                  Write Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-8">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-700 hover:text-toy-primary text-sm sm:text-base outline-none cursor-pointer"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  size={12}
                  className={`text-gray-400 transition-transform duration-300 ${
                    activeFaq === index ? "rotate-180 text-toy-primary" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="p-5 pt-0 text-sm text-gray-500 border-t border-slate-50 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
