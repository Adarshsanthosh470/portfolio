'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [averageRating, setAverageRating] = useState(4.5);
  const [totalRatings, setTotalRatings] = useState(0);

  // Load ratings from localStorage on mount
  useEffect(() => {
    const savedRatings = localStorage.getItem('portfolioRatings');
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      const avg = ratings.length > 0 ? (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1) : 4.5;
      setAverageRating(parseFloat(avg as string));
      setTotalRatings(ratings.length);
    }
  }, []);

  const handleRating = async (selectedRating: number) => {
    setRating(selectedRating);
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('rating', selectedRating.toString());

      const response = await fetch('https://formspree.io/f/mdalonqq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Save to localStorage
        const savedRatings = localStorage.getItem('portfolioRatings');
        const ratings = savedRatings ? JSON.parse(savedRatings) : [];
        ratings.push(selectedRating);
        localStorage.setItem('portfolioRatings', JSON.stringify(ratings));

        // Update average and total
        const avg = (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1);
        setAverageRating(parseFloat(avg as string));
        setTotalRatings(ratings.length);

        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          setRating(0);
        }, 2000);
      } else {
        setErrorMessage('Failed to submit rating. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error submitting rating. Please try again.');
      console.error('Rating submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 bg-neutral-900" id="rating">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-800 rounded-xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" /> Rate This Portfolio
          </h2>
          <p className="text-neutral-400 mb-6">What do you think of this portfolio?</p>

          {/* Current Rating Display */}
          <div className="mb-8 p-4 bg-neutral-700/50 rounded-lg border border-blue-500/20">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl font-bold text-yellow-400">{averageRating}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-500'}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Based on <span className="text-blue-400 font-semibold">{totalRatings}</span> {totalRatings === 1 ? 'rating' : 'ratings'}
            </p>
          </div>

          {/* Star Rating Buttons */}
          <div className="flex gap-4 justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={isSubmitting}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="focus:outline-none transition-transform disabled:opacity-50"
              >
                <Star
                  size={56}
                  className={`transition-all duration-200 cursor-pointer ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_#facc15]'
                      : 'text-neutral-600 hover:text-yellow-400'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {rating > 0 && !successMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-400 mb-4 font-medium"
            >
              You're giving <span className="text-yellow-400">{rating} star{rating !== 1 ? 's' : ''}</span>
            </motion.p>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-4"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg font-semibold"
            >
              ✨ Thank you for rating! Your feedback has been recorded.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RatingForm;