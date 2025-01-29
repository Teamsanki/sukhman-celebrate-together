import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const photos = [
  'https://source.unsplash.com/random/800x600?birthday,1',
  'https://source.unsplash.com/random/800x600?celebration,1',
  'https://source.unsplash.com/random/800x600?party,1',
  'https://source.unsplash.com/random/800x600?cake,1',
  'https://source.unsplash.com/random/800x600?gift,1',
  'https://source.unsplash.com/random/800x600?balloons,1',
  'https://source.unsplash.com/random/800x600?confetti,1',
];

const Celebrate = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [reactions, setReactions] = useState(100);
  const [views, setViews] = useState(200);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    const reactionInterval = setInterval(() => {
      setReactions((prev) => prev + 20);
    }, 180000); // 3 minutes

    const viewInterval = setInterval(() => {
      setViews((prev) => prev + 20);
    }, 120000); // 2 minutes

    return () => {
      clearInterval(photoInterval);
      clearInterval(reactionInterval);
      clearInterval(viewInterval);
    };
  }, []);

  const handleReaction = () => {
    setReactions((prev) => prev + 1);
    toast('Thanks for reacting! 🎉');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center text-primary mb-8">
          Happy Birthday Sukhman! 🎉
        </h1>

        <div className="photo-slider mb-8">
          <img
            src={photos[currentPhotoIndex]}
            alt={`Celebration ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>

        <div className="flex justify-between mb-8">
          <div className="text-lg">
            <span className="font-bold">{views}</span> Views
          </div>
          <div className="text-lg">
            <span className="font-bold">{reactions}</span> Reactions
          </div>
        </div>

        <button
          onClick={handleReaction}
          className="reaction-button w-full mb-8"
        >
          Send Birthday Love ❤️
        </button>

        <div className="message-container">
          <h2 className="text-2xl md:text-3xl mb-4 text-primary">
            A Message from Sumit
          </h2>
          <p className="text-lg leading-relaxed">
            Dear Sukhman, my best friend! 🌟
            <br /><br />
            On your special day, I want to tell you how grateful I am to have you in my life.
            Your friendship means the world to me, and I hope this birthday brings you all
            the joy and happiness you deserve. Here's to many more years of our amazing
            friendship! 
            <br /><br />
            Happy Birthday! 🎂✨
            <br />
            - Sumit
          </p>
        </div>
      </div>
    </div>
  );
};

export default Celebrate;