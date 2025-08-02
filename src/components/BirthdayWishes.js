import React from 'react';
import './BirthdayWishes.css';

const BirthdayWishes = ({ onClose }) => {
  const wishes = [
    "May your day be filled with joy, laughter, and wonderful surprises! 🎉",
    "Wishing you a year ahead filled with happiness, success, and beautiful moments! ✨",
    "May all your dreams come true and may you be blessed with health and prosperity! 🌟"
  ];

  return (
    <div className="wishes-modal-overlay" onClick={onClose}>
      <div className="wishes-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wishes-header">
          <h2 className="wishes-title">🎂 Birthday Wishes 🎂</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="wishes-content">
          <div className="wishes-container">
            {wishes.map((wish, index) => (
              <div key={index} className="wish-card">
                <p className="wish-text">{wish}</p>
              </div>
            ))}
          </div>
          
          <div className="wishes-footer">
            <p className="wishes-signature">With love and best wishes,</p>
            <p className="wishes-from">Your Birthday Celebration Team 💖</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishes; 