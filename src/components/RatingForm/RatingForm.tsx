'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setErrorMessage('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('stars', rating.toString());
      formData.append('feedback', feedback);

      const response = await fetch('https://formspree.io/f/mdalonqq', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(true);
        setRating(0);
        setFeedback('');
        setTimeout(() => setSuccessMessage(false), 4000);
      } else {
        setErrorMessage('Failed to submit. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 bg-neutral-900" id="rating">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-800 rounded-xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" /> Rate My Portfolio
          </h2>
          <p className="text-neutral-400 mb-8">
            Your feedback helps me improve. Leave a rating and share your thoughts!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col gap-4">
              <label className="text-white font-semibold">How would you rate this portfolio?</label>
              <div className="flex gap-3 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus:outline-none transition-transform"
                  >
                    <Star
                      size={48}
                      className={`transition-all duration-200 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_#facc15]'
                          : 'text-neutral-600 hover:text-yellow-400'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-blue-400 text-sm font-medium">
                  You rated: <span className="text-yellow-400">{rating} out of 5</span>
                </p>
              )}
            </div>

            {/* Hidden Input for Formspree */}
            <input type="hidden" name="stars" value={rating} />

            {/* Feedback Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold">Your Feedback (Optional)</label>
              <textarea
                name="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or what you liked..."
                className="w-full h-24 bg-neutral-700 text-white placeholder-neutral-500 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 p-4 transition-all duration-200 resize-none"
              />
              <p className="text-xs text-neutral-500">Max 500 characters</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                'Submit Rating'
              )}
            </motion.button>
          </form>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg text-center font-semibold"
            >
              ✨ Thanks for the rating! Your feedback has been recorded.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RatingForm;
