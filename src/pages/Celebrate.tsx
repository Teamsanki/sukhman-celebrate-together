import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import * as faceapi from 'face-api.js';
import { Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = [
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7379.jpeg?alt=media&token=33c12fea-af79-4a99-842a-8ee8c580be01',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7380.jpeg?alt=media&token=8ded5656-19ad-4b6a-b4cc-ebf29418d3d8',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7830.jpeg?alt=media&token=ca31bd52-45cf-4af9-b5d3-62c8a8b7063e',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7831.jpeg?alt=media&token=7777b800-d8f9-4595-8fd2-62f8033fa22b',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FIMG_7832.jpeg?alt=media&token=42a46cb4-7bbd-4918-afa6-acda96531070',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FWhatsApp%20Image%202025-01-29%20at%2011.42.49%20PM.jpeg?alt=media&token=47d059fe-6f92-4c4e-b0b7-c58c897b8156',
  'https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sukhman%2FWhatsApp%20Image%202025-01-29%20at%2011.42.48%20PM.jpeg?alt=media&token=5508c3d6-cd30-433e-9741-5cbdefb74ce1',
];

const reactionMessages = [
  "Someone just reacted! ❤️",
  "Someone sent birthday love! ❤️",
  "Someone added a reaction! ❤️",
  "Someone wishes you! ❤️",
  "Someone sent love! ❤️"
];

const Celebrate = () => {
  const [reactions, setReactions] = useState(100);
  const [views, setViews] = useState(200);
  const [recentReactions, setRecentReactions] = useState<string[]>([]);
  const [processedPhotos, setProcessedPhotos] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        processImages();
      } catch (error) {
        console.error('Error loading face detection models:', error);
        setProcessedPhotos(photos); // Fallback to original photos if face detection fails
      }
    };
    loadModels();
  }, []);

  const processImages = async () => {
    const processed = await Promise.all(
      photos.map(async (photo) => {
        try {
          const img = await faceapi.fetchImage(photo);
          const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions());
          
          if (detections) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const box = detections.box;
            
            // Make the crop area slightly larger than the face
            const cropSize = Math.max(box.width, box.height) * 1.5;
            const centerX = box.x + box.width / 2;
            const centerY = box.y + box.height / 2;
            
            canvas.width = cropSize;
            canvas.height = cropSize;
            
            if (ctx) {
              ctx.drawImage(
                img,
                centerX - cropSize / 2,
                centerY - cropSize / 2,
                cropSize,
                cropSize,
                0,
                0,
                cropSize,
                cropSize
              );
              return canvas.toDataURL();
            }
          }
          return photo; // Return original if face detection fails
        } catch (error) {
          console.error('Error processing image:', error);
          return photo; // Return original on error
        }
      })
    );
    setProcessedPhotos(processed);
  };

  useEffect(() => {
    // Update views every 30 seconds
    const viewInterval = setInterval(() => {
      setViews(prev => {
        const newViews = prev + 5;
        localStorage.setItem('birthdayViews', newViews.toString());
        return newViews;
      });
    }, 30000);

    // Add random reactions every 3 seconds
    const reactionInterval = setInterval(() => {
      const newMessage = reactionMessages[Math.floor(Math.random() * reactionMessages.length)];
      setRecentReactions(prev => [newMessage, ...prev].slice(0, 5));
      
      setReactions(prev => {
        const newReactions = prev + 1;
        localStorage.setItem('birthdayReactions', newReactions.toString());
        return newReactions;
      });
    }, 3000);

    // Load saved values
    const savedViews = localStorage.getItem('birthdayViews');
    const savedReactions = localStorage.getItem('birthdayReactions');
    if (savedViews) setViews(parseInt(savedViews));
    if (savedReactions) setReactions(parseInt(savedReactions));

    return () => {
      clearInterval(viewInterval);
      clearInterval(reactionInterval);
    };
  }, []);

  const handleReaction = () => {
    setReactions(prev => {
      const newReactions = prev + 1;
      localStorage.setItem('birthdayReactions', newReactions.toString());
      return newReactions;
    });
    const newMessage = "You reacted with love! ❤️";
    setRecentReactions(prev => [newMessage, ...prev].slice(0, 5));
    toast('Thanks for reacting! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-6xl text-center text-primary mb-8 animate-fade-in">
          Happy Birthday Sukhman! 🎉
        </h1>

        <div className="mb-12">
          <Carousel className="w-full max-w-4xl mx-auto" ref={carouselRef}>
            <CarouselContent>
              {processedPhotos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <img
                      src={photo}
                      alt={`Celebration ${index + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {!isMobile && (
              <>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </>
            )}
          </Carousel>
        </div>

        <div className="flex justify-between mb-8 p-4 bg-white rounded-lg shadow-md animate-fade-in">
          <div className="text-base md:text-lg">
            <span className="font-bold text-primary">{views}</span>
            <span className="text-gray-600"> Views</span>
          </div>
          <div className="text-base md:text-lg">
            <span className="font-bold text-primary">{reactions}</span>
            <span className="text-gray-600"> Reactions</span>
          </div>
        </div>

        <button
          onClick={handleReaction}
          className="w-full p-3 md:p-4 mb-8 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all duration-300 animate-fade-in"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-base md:text-lg">Send Birthday Love</span>
        </button>

        <div className="recent-reactions mb-8 space-y-2">
          {recentReactions.map((message, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm animate-[slideUp_0.3s_ease-out] transform transition-all hover:scale-102"
              style={{
                animation: `slideUp 0.3s ease-out ${index * 0.1}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {message}
            </div>
          ))}
        </div>

        <div className="message-container animate-fade-in backdrop-blur-sm bg-white/80 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-3xl mb-4 text-primary">
            A Message from Sumit
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
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
