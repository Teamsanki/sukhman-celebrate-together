import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const photos = [
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7379.jpeg?alt=media&token=33c12fea-af79-4a99-842a-8ee8c580be01',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7380.jpeg?alt=media&token=8ded5656-19ad-4b6a-b4cc-ebf29418d3d8',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7830.jpeg?alt=media&token=ca31bd52-45cf-4af9-b5d3-62c8a8b7063e',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7831.jpeg?alt=media&token=7777b800-d8f9-4595-8fd2-62f8033fa22b',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7832.jpeg?alt=media&token=42a46cb4-7bbd-4918-afa6-acda96531070',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FWhatsApp%20Image%202025-01-29%20at%2011.42.49%20PM.jpeg?alt=media&token=47d059fe-6f92-4c4e-b0b7-c58c897b8156',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FWhatsApp%20Image%202025-01-29%20at%2011.42.48%20PM.jpeg?alt=media&token=5508c3d6-cd30-433e-9741-5cbdefb74ce1',
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
