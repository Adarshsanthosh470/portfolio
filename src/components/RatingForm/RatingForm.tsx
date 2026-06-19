'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';

const RatingForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Stats dynamically calculated from Google Sheets approved reviews
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) return;

      try {
        const response = await fetch(scriptUrl);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const sum = data.reduce((acc: number, curr: any) => acc + Number(curr.rating || curr.Rating || 0), 0);
            const avg = parseFloat((sum / data.length).toFixed(1));
            setAverageRating(avg);
            setTotalRatings(data.length);
          }
        }
      } catch (err) {
        console.error('Error fetching rating stats:', err);
      }
    };

    fetchStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMessage('Please select a star rating.');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage('Please write a review.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error('Google Sheet script URL is not configured.');
      }

      // Submit directly to Google Sheets Web App
      // We use text/plain to prevent CORS preflight requests from failing on Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          name: name.trim(),
          rating: rating,
          review: reviewText.trim()
        })
      });

      const resData = await response.json();
      if (resData.status !== 'success') {
        throw new Error(resData.message || 'Google Sheets submission failed');
      }

      setSuccessMessage(true);
      setName('');
      setRating(0);
      setReviewText('');
      
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
    } catch (error) {
      setErrorMessage('Error submitting review. Please try again.');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 bg-neutral-950/40" id="rating">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-300 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400/20" /> Share Your Feedback
          </h2>
          <p className="text-neutral-400 mb-8 text-center text-sm md:text-base">
            Your review helps me improve. Let me know what you think!
          </p>

          {/* Current Rating Stats Display */}
          <div className="mb-8 p-5 bg-neutral-800/40 rounded-xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Average User Rating</p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {totalRatings > 0 ? averageRating : '—'}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const diff = averageRating - star + 1;
                    const fillClass = diff >= 1 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : diff >= 0.5 
                        ? 'fill-yellow-400/50 text-yellow-400' 
                        : 'text-neutral-700';
                    return (
                      <Star key={star} size={18} className={fillClass} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-neutral-800" />
            <div className="text-center md:text-right">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Total Submissions</p>
              <p className="text-2xl font-bold text-white">
                <span className="text-blue-400">{totalRatings}</span> {totalRatings === 1 ? 'Verified Review' : 'Verified Reviews'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Star Selection Row */}
            <div className="flex flex-col items-center justify-center p-4 bg-neutral-800/20 rounded-xl border border-white/5 mb-2">
              <span className="text-sm font-medium text-neutral-300 mb-3">Tap to rate your experience</span>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none transition-transform"
                  >
                    <Star
                      size={42}
                      className={`transition-all duration-200 cursor-pointer ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                          : 'text-neutral-600 hover:text-yellow-500'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <span className="text-xs text-yellow-400 mt-2 font-medium">
                  {rating === 5 ? 'Excellent! 🌟' : rating === 4 ? 'Great! 👍' : rating === 3 ? 'Good 🙂' : rating === 2 ? 'Could be better 😐' : 'Disappointing 😞'}
                </span>
              )}
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-sm font-medium text-neutral-300">Name</label>
              <input
                id="form-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-neutral-800/50 hover:bg-neutral-800 border border-white/10 focus:border-blue-500/80 rounded-xl p-3 text-white placeholder-neutral-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            {/* Review Comment Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-review" className="text-sm font-medium text-neutral-300">Your Review</label>
              <textarea
                id="form-review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about the design, interface, projects, or ZenithBot..."
                className="w-full bg-neutral-800/50 hover:bg-neutral-800 border border-white/10 focus:border-blue-500/80 rounded-xl p-3 text-white placeholder-neutral-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3.5 rounded-xl text-sm font-medium text-center"
              >
                ✨ Thank you! Your review has been submitted successfully.
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10 border border-white/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
                  Submitting Feedback...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-blue-200" />
                  Submit Review
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RatingForm;