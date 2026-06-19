'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Loader2 } from 'lucide-react';
import { selectedReviews, Review } from '@/data/selectedReviews';

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      // If the script URL isn't configured, fall back to the static empty file.
      if (!scriptUrl) {
        setReviews(selectedReviews);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(scriptUrl);
        if (response.ok) {
          const data = await response.json();
          // Google Sheets headers might be uppercase or lowercase, let's map them safely
          const formattedReviews = Array.isArray(data)
            ? data
                .filter((r: any) => (r.name || r.Name) && (r.review || r.Review))
                .map((r: any, idx: number) => ({
                  id: r.id || r.Id || String(idx),
                  name: r.name || r.Name || 'Anonymous',
                  rating: Number(r.rating || r.Rating || 5),
                  review: r.review || r.Review || '',
                  date: r.date || r.Date || 'Recent',
                }))
            : [];
          setReviews(formattedReviews);
        } else {
          console.error('Failed to fetch reviews: Server error');
          setReviews(selectedReviews);
        }
      } catch (err) {
        console.error('Error fetching reviews from Google Sheet:', err);
        setReviews(selectedReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="py-20 px-4 bg-neutral-950/20" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Reviews & Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            What Visitors Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-neutral-400 max-w-xl mx-auto text-sm md:text-base"
          >
            Here are the approved reviews left by developers and visitors. 
            {!process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL && " (Google Sheets connection pending setup)"}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-neutral-500 text-sm">Loading reviews from database...</p>
          </div>
        ) : reviews.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 bg-neutral-900/40 rounded-2xl border border-white/5 text-neutral-500 max-w-md mx-auto"
          >
            <p className="mb-2 text-white/80 font-medium">No reviews to show yet.</p>
            <p className="text-xs">Be the first to submit feedback in the section below!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                className="group relative bg-neutral-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/2 group-hover:to-purple-500/2 rounded-2xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.3)]'
                            : 'text-neutral-700'
                        }
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 italic font-light">
                    "{review.review}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/5 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/20 text-blue-300 text-xs font-bold shadow-[0_0_10px_rgba(59,130,246,0.1)] group-hover:border-blue-500/40 group-hover:text-blue-200 transition-all duration-300">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors duration-200">
                      {review.name}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {review.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
