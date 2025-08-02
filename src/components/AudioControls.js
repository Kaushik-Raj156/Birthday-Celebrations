import React from 'react';
import './AudioControls.css';

const AudioControls = ({ 
  isPlaying, 
  onPlayToggle, 
  onWishesToggle, 
  showWishes 
}) => {
  return (
    <div className="audio-controls">
      <button 
        className={`control-button play-button ${isPlaying ? 'playing' : ''}`}
        onClick={onPlayToggle}
      >
        {isPlaying ? '⏸️ Pause Song' : '🎵 Play Song'}
      </button>
      
      <button 
        className={`control-button wishes-button ${showWishes ? 'active' : ''}`}
        onClick={onWishesToggle}
      >
        {showWishes ? '💝 Hide Wishes' : '💝 Show Wishes'}
      </button>
    </div>
  );
};

export default AudioControls; 