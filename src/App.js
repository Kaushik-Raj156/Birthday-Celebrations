import React, { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import BirthdayCake from './components/BirthdayCake';
import AudioControls from './components/AudioControls';
import BirthdayWishes from './components/BirthdayWishes';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const audioRef = useRef(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlayToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleWishesToggle = () => {
    setShowWishes(!showWishes);
  };

  const handleCandleBlow = () => {
    setCandleBlown(true);
    setShowConfetti(true);
    
    // Hide confetti after 5 seconds and automatically show wishes
    setTimeout(() => {
      setShowConfetti(false);
      setShowWishes(true);
    }, 5000);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameInput(false);
    }
  };

  const handleReset = () => {
    setUserName('');
    setShowNameInput(true);
    setCandleBlown(false);
    setShowConfetti(false);
    setShowWishes(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  if (showNameInput) {
    return (
      <div className="App">
        <div className="name-input-container">
          <h1 className="welcome-title">🎂 Welcome to Your Birthday Celebration! 🎂</h1>
          <form onSubmit={handleNameSubmit} className="name-form">
            <label htmlFor="userName" className="name-label">
              Enter your name to start the celebration:
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name here..."
              className="name-input"
              required
            />
            <button type="submit" className="start-button">
              Start Birthday Celebration! 🎉
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={800}
            colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#ff8b94', '#ffd93d', '#6c5ce7']}
            gravity={0.3}
            wind={0.05}
            initialVelocityX={30}
            initialVelocityY={50}
            tweenDuration={5000}
            confettiSource={{
              x: 0,
              y: 0,
              w: windowDimensions.width,
              h: 20
            }}
          />
        </div>
      )}
      
      <div className="birthday-container">
        <h1 className="birthday-title">
          🎉 Happy Birthday, {userName}! 🎉
        </h1>
        
        <button onClick={handleReset} className="reset-button">
          🎂 Start New Celebration
        </button>
        
        <div className="cake-section">
          <BirthdayCake 
            candleBlown={candleBlown}
            onCandleBlow={handleCandleBlow}
          />
        </div>

        <div className="controls-section">
          <AudioControls
            isPlaying={isPlaying}
            onPlayToggle={handlePlayToggle}
            onWishesToggle={handleWishesToggle}
            showWishes={showWishes}
            audioRef={audioRef}
          />
        </div>

        {showWishes && (
          <BirthdayWishes onClose={() => setShowWishes(false)} />
        )}
      </div>

      <audio
        ref={audioRef}
        src="birthday-song.mp3"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default App; 