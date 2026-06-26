import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaComment, FaCalendarAlt, FaUser, FaClock, FaTimes, FaHeart, FaChevronRight, FaBookOpen } from "react-icons/fa";
import { toast } from "react-toastify";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Creative Lego Challenges for Preschoolers",
    excerpt: "Lego sets are more than just building blocks. Discover 5 fun challenges that boost shape recognition, fine motor skills, and creative storytelling in toddlers.",
    content: "Lego sets are the ultimate tool for open-ended child development. When a child picks up a Lego block, they aren't just building a house; they are experimenting with scale, gravity, color combinations, and motor coordination. \n\nHere are five fun challenges to try at home:\n1. The Monochromatic Tower: Build a tower using only blue or red blocks. This tests color sorting!\n2. Animal Kingdom: Ask your child to build a mythical animal and tell you its name and super power.\n3. The Bridge Test: Build a simple span between two books and see how many toy cars it can support.\n4. Alphabet Blocks: Form letters (like A, B, C) using Lego blocks to blend reading and play.\n5. Story Blueprint: Let them build a structure and use it as a stage to act out a bedtime story.\n\nBy turning building into a game with rules, kids develop soft logic skills and learn to handle challenges constructively.",
    category: "Play & Learn",
    image: "https://i.ibb.co.com/WQ97xNB/lego.jpg",
    author: "Sarah Jenkins (Child Educator)",
    date: "June 15, 2026",
    readTime: "4 min read",
    likes: 24,
    comments: [
      { author: "Emma Davis", text: "My 4-year-old loved the Bridge Test! We piled 8 hot wheels on it." },
      { author: "Mark R.", text: "Great tips! Lego has been a lifesaver for rainy afternoons." }
    ]
  },
  {
    id: 2,
    title: "The Power of Screen-Free Play in a Digital Age",
    excerpt: "Why tactile, real-world toys like wooden trains and action figures remain vital for development, attention spans, and emotional growth in kids.",
    content: "In an era of tablets and smartphones, tactile toys are more critical than ever. Research indicates that physical manipulation of objects activates different motor and visual pathways in a child's brain compared to flat screens. \n\nTactile toys offer:\n- Spatial Awareness: Understanding 3D physics by stacking, rotating, and sorting blocks.\n- Creative Mastery: Unlike a pre-programmed video game, a sandbox or action figure has no predefined script. The child makes the rules.\n- Social Regulation: Playing board games or sharing toys teaches negotiation, sharing, and verbal expression.\n\nEncouraging screen-free play doesn't mean rejecting technology. Instead, create 'tech-free zones' in the home dedicated to books, action figures, board games, and drawing kits. Even 30 minutes of focused tactile play a day shows visible improvements in child patience and attention spans.",
    category: "Parenting",
    image: "https://i.ibb.co.com/1Gr6n3dW/edu.webp",
    author: "Dr. Aris Carter (Pediatrician)",
    date: "June 20, 2026",
    readTime: "6 min read",
    likes: 42,
    comments: [
      { author: "Liam Jones", text: "Very true. We restricted tablet hours and saw a huge leap in our son's Lego building time." }
    ]
  },
  {
    id: 3,
    title: "Why Family Board Games are Secretly Math Lessons",
    excerpt: "From counting squares in UNO to sorting resource cards, learn how popular tabletop games teach your kids advanced mathematics without them knowing it!",
    content: "Tabletop and card games are covert classrooms! Children dread traditional worksheets, but they will gladly calculate scores, add currency, and measure routes in a competitive board game. \n\nHere is how board games teach math:\n- Subitizing: Recognizing the number of dots on a dice instantly without counting them individually.\n- Basic Arithmetic: Adding card values in UNO or tracking score card points.\n- Probability: Weighing the risk of drawing cards or landing on specific tiles.\n- Strategic Planning: Managing limited resources or planning moves multiple steps in advance.\n\nNext time you host a family game night, know that you are hosting a fun, stress-free mathematics seminar that builds emotional bonds and numbers confidence.",
    category: "Play & Learn",
    image: "https://i.ibb.co.com/43MCr4n/uno.jpg",
    author: "Professor Dave Higgins",
    date: "June 22, 2026",
    readTime: "5 min read",
    likes: 31,
    comments: [
      { author: "Sofia Taylor", text: "We play UNO every Friday. My daughter's addition speed has improved so much!" }
    ]
  },
  {
    id: 4,
    title: "A Parent's Guide to Choosing Safe Action Figures",
    excerpt: "With so many options out there, learn how to check plastic grading, safety edges, and joint structures for toys your children will love.",
    content: "Action figures represent agency and heroism for kids, allowing them to project confidence and explore conflicts safely. However, safety checks are essential before purchasing. \n\nWhat to look out for:\n- Material Safety: Ensure plastics are labeled BPA-free and Phthalate-free.\n- Small Parts: For children under 3, avoid figures with detachable hands, helmets, or weapon models to prevent choking hazards.\n- Durability: Check joint hinges. Premium action figures shouldn't snap easily under standard play stress.\n- Paint Grade: Non-toxic water-based paints are preferred, as children often put toys close to their mouths.\n\nBuying authenticated products from reputable stores is the easiest way to guarantee safety certificates.",
    category: "Toy Reviews",
    image: "https://i.ibb.co.com/pvnPBPMf/trans.jpg",
    author: "Nadia Vance (Toy Designer)",
    date: "June 25, 2026",
    readTime: "3 min read",
    likes: 19,
    comments: []
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const [posts, setPosts] = useState(blogPosts);

  // Modal comments state
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Search & Filter Logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (id, e) => {
    e.stopPropagation(); // prevent opening modal when clicking like
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
    toast.success("Article Liked!");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const updatedPosts = posts.map((post) => {
      if (post.id === activeArticle.id) {
        const newComments = [
          ...post.comments,
          { author: newCommentName.trim(), text: newCommentText.trim() },
        ];
        // update currently open article view too
        setActiveArticle({ ...activeArticle, comments: newComments });
        return { ...post, comments: newComments };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewCommentName("");
    setNewCommentText("");
    toast.success("Comment posted successfully!");
  };

  const categories = ["All", "Parenting", "Play & Learn", "Toy Reviews"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Blog Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-toy-primary bg-toy-primary-light px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
          The ToyTopia Sandbox
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-2">
          Parenting Tips & <span className="text-toy-secondary">Toy Guides</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Stay informed with advice from educators, child development studies, and reviews.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-10">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm border border-slate-100 focus:border-toy-primary transition-all text-gray-700"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-toy-primary text-white shadow-md shadow-toy-primary/10"
                  : "bg-slate-50 text-gray-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 max-w-sm mx-auto bg-white border border-slate-100 p-8 rounded-3xl shadow-sm animate-fade-in my-8">
          <div className="text-6xl animate-bounce select-none text-toy-primary flex justify-center"><FaBookOpen /></div>
          <h3 className="text-lg font-extrabold text-slate-800">No articles found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We couldn't find any articles matching your search criteria. Try checking your spelling or reset the filters!
          </p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
            className="bg-toy-primary hover:bg-toy-primary/95 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Header Image */}
                <div className="h-56 overflow-hidden bg-slate-100 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-toy-primary font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-6">
                  <div className="flex gap-4 text-xs text-gray-400 mb-3 font-semibold">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                    <span className="flex items-center gap-1"><FaClock /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-toy-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <FaUser /> By {post.author.split(" (")[0]}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-toy-accent bg-slate-50 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                  >
                    <FaHeart className="text-toy-accent" /> {post.likes}
                  </button>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-slate-50 px-2.5 py-1.5 rounded-xl">
                    <FaComment className="text-toy-primary" /> {post.comments.length}
                  </span>
                  <span className="text-toy-primary font-bold text-xs flex items-center gap-1 ml-2 group-hover:translate-x-1 transition-transform">
                    Read <FaChevronRight size={8} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Article Detail Stateful Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-slate-100 text-gray-700 p-2.5 rounded-full shadow-md z-20 active:scale-95 transition-all cursor-pointer border border-slate-100"
              >
                <FaTimes size={16} />
              </button>

              {/* Header Image */}
              <div className="h-64 sm:h-80 w-full overflow-hidden bg-slate-100 relative flex-shrink-0">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-toy-primary text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block">
                    {activeArticle.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                    {activeArticle.title}
                  </h2>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-semibold border-b border-slate-100 pb-4">
                  <span className="flex items-center gap-1"><FaUser className="text-toy-primary" /> {activeArticle.author}</span>
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {activeArticle.date}</span>
                  <span className="flex items-center gap-1"><FaClock /> {activeArticle.readTime}</span>
                </div>

                {/* Article Text */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {activeArticle.content}
                </p>

                {/* Comments Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Comments ({activeArticle.comments.length})
                  </h4>

                  {/* Comment List */}
                  {activeArticle.comments.length === 0 ? (
                    <p className="text-gray-400 text-xs italic py-2">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {activeArticle.comments.map((c, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-2xl">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-800 text-xs">{c.author}</span>
                            <span className="text-[10px] text-gray-400">Just now</span>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm leading-normal">
                            {c.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Box Form */}
                  <form onSubmit={handleAddComment} className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-200">
                    <h5 className="text-xs font-bold text-gray-700">Write a comment</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        className="bg-white px-3 py-2 rounded-xl text-xs outline-none border border-slate-100 focus:border-toy-primary w-full text-gray-700"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Share your thoughts or question..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      rows="3"
                      className="bg-white p-3 rounded-xl text-xs outline-none border border-slate-100 focus:border-toy-primary w-full text-gray-700 resize-none"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-toy-primary hover:bg-toy-primary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
