'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, LogOut, X, Send, Loader2, ArrowRight } from 'lucide-react';

const ExitIntent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'prompt' | 'form' | 'goodbye'>('prompt');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Setup exit intent event listener
  useEffect(() => {
    const isPrompted = localStorage.getItem('portfolio_review_done') === 'true';
    if (isPrompted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 20 generally means the user is heading to close the tab or change URL
      if (e.clientY < 20) {
        setIsOpen(true);
        setStep('prompt');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleOpenManually = () => {
    setRating(0);
    setName('');
    setReviewText('');
    setStep('prompt');
    setIsOpen(true);
  };

  const handleSelectStar = (stars: number) => {
    setRating(stars);
    setStep('form');
  };

  const handleSkip = () => {
    localStorage.setItem('portfolio_review_done', 'true');
    setStep('goodbye');
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

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

      // Primary: Post to Google Sheet Web App
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

      localStorage.setItem('portfolio_review_done', 'true');
      setStep('goodbye');
      setName('');
      setRating(0);
      setReviewText('');
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setErrorMessage('Error submitting review. Please try again.');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Exit Button */}
      <button
        onClick={handleOpenManually}
        className="fixed top-6 right-6 z-[90] flex items-center gap-2 px-4.5 py-2 rounded-full border border-white/10 bg-neutral-900/70 backdrop-blur-md text-white font-medium hover:border-red-500/30 hover:bg-neutral-900 hover:text-red-400 transition-all duration-300 text-xs md:text-sm shadow-xl active:scale-95 group magnetic-target"
      >
        <LogOut className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
        Exit Portfolio
      </button>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-center overflow-hidden z-10"
            >
              {/* Decorative ambient gradient */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {/* STEP 1: Prompt & Rate Selection */}
                {step === 'prompt' && (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Star className="w-6 h-6 fill-blue-400/20 animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                      Before You Leave...
                    </h3>
                    <p className="text-neutral-400 text-sm md:text-base mb-8 max-w-sm mx-auto">
                      Would you mind taking 10 seconds to rate your experience on this portfolio?
                    </p>

                    {/* Interactive Star Row */}
                    <div className="flex gap-3 justify-center mb-8">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => handleSelectStar(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                        >
                          <Star
                            size={48}
                            className={`transition-all duration-200 cursor-pointer ${
                              star <= (hoveredRating || rating)
                                ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                                : 'text-neutral-700 hover:text-yellow-500'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleSkip}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white font-medium transition-all text-sm hover:bg-white/5 active:scale-95"
                      >
                        Skip & Exit
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Standard Name & Review Form */}
                {step === 'form' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="text-left space-y-4"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" /> Share your review
                    </h3>
                    <p className="text-neutral-400 text-xs md:text-sm mb-4">
                      You rated this portfolio <span className="text-yellow-400 font-semibold">{rating} Star{rating !== 1 ? 's' : ''}</span>. Add your details to finish!
                    </p>

                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-name" className="text-xs font-semibold text-neutral-400">Name</label>
                      <input
                        id="modal-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-neutral-800/60 border border-white/10 focus:border-blue-500/80 rounded-xl p-3 text-white placeholder-neutral-500 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        required
                      />
                    </div>

                    {/* Review Comment Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-review" className="text-xs font-semibold text-neutral-400">Review</label>
                      <textarea
                        id="modal-review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="What did you like the most? (e.g. eye animations, custom scroll, chatbot...)"
                        className="w-full bg-neutral-800/60 border border-white/10 focus:border-blue-500/80 rounded-xl p-3 text-white placeholder-neutral-500 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 h-24 resize-none text-sm"
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-xl text-xs">
                        {errorMessage}
                      </div>
                    )}

                    {/* Form Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep('prompt')}
                        className="w-full sm:w-1/3 px-5 py-3 rounded-xl border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all text-xs font-medium hover:bg-neutral-800"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-2/3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-5 rounded-xl transition-all text-xs shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-blue-200" />
                            Submit Review
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: Goodbye State */}
                {step === 'goodbye' && (
                  <motion.div
                    key="goodbye"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6"
                  >
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Goodbye!</h3>
                    <p className="text-neutral-400 text-sm">
                      Thank you for visiting! Safe travels on your coding journey.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExitIntent;
