import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const navigate = useNavigate();
  const targetDate = new Date('2024-02-01T00:00:00');
  const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FLuke-Bergs-x-Lichu-Summer-Breeze(chosic.com).mp3?alt=media&token=279a40b5-7c95-466d-b3dc-8e66f5582ca5');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setShowCelebrate(true);
        setTimeLeft('');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!audioPlayed) {
      const playAudio = async () => {
        try {
          await audio.play();
          setAudioPlayed(true);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (error) {
          console.error('Audio playback failed:', error);
        }
      };

      const handleInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleInteraction);
      };

      document.addEventListener('click', handleInteraction);
      return () => document.removeEventListener('click', handleInteraction);
    }
  }, [audioPlayed]);

  const handleCelebrate = () => {
    navigate('/celebrate');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="profile-circle">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7379.jpeg?alt=media&token=33c12fea-af79-4a99-842a-8ee8c580be01"
          alt="Sukhman"
          className="w-full h-full object-cover"
        />
      </div>
      
      {!showCelebrate ? (
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl mb-8 text-primary">
            Sukhman's Birthday Countdown
          </h1>
          <div className="countdown-container">
            {timeLeft}
          </div>
        </div>
      ) : (
        <button
          onClick={handleCelebrate}
          className="celebrate-button animate-bounce"
        >
          Click to Celebrate!
        </button>
      )}
    </div>
  );
};

export default Index;
