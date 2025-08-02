import React, { useState, useEffect, useRef } from 'react';
import './BirthdayCake.css';

const BirthdayCake = ({ candleBlown, onCandleBlow }) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [candleFlicker, setCandleFlicker] = useState(true);
  const [micPermission, setMicPermission] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Candle flicker animation
    const flickerInterval = setInterval(() => {
      setCandleFlicker(prev => !prev);
    }, 100);

    // Request microphone permission on component mount
    requestMicrophonePermission();

    return () => {
      clearInterval(flickerInterval);
      stopListening();
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      startListening(stream);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicPermission(false);
    }
  };

  const startListening = async (stream) => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setAudioLevel(average);
        
        // Check if audio level is high enough to blow the candle
        if (average > 130 && !candleBlown) {
          onCandleBlow();
        }
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicPermission(false);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
  };

  return (
    <div className="birthday-cake">
      <div className="cake">
        <div className="cake-layer cake-bottom"></div>
        <div className="cake-layer cake-middle"></div>
        <div className="cake-layer cake-top"></div>
        
        <div className="frosting">
          <div className="frosting-detail"></div>
          <div className="frosting-detail"></div>
          <div className="frosting-detail"></div>
        </div>
        
        <div className="candles">
          <div className={`candle ${candleBlown ? 'blown' : ''}`}>
            <div className={`flame ${candleFlicker ? 'flicker' : ''} ${candleBlown ? 'extinguished' : ''}`}>
              <div className="flame-inner"></div>
            </div>
            <div className="candle-body"></div>
          </div>
          <div className={`candle ${candleBlown ? 'blown' : ''}`}>
            <div className={`flame ${candleFlicker ? 'flicker' : ''} ${candleBlown ? 'extinguished' : ''}`}>
              <div className="flame-inner"></div>
            </div>
            <div className="candle-body"></div>
          </div>
          <div className={`candle ${candleBlown ? 'blown' : ''}`}>
            <div className={`flame ${candleFlicker ? 'flicker' : ''} ${candleBlown ? 'extinguished' : ''}`}>
              <div className="flame-inner"></div>
            </div>
            <div className="candle-body"></div>
          </div>
        </div>
      </div>
      
      <div className="cake-plate"></div>
      
      <div className="mic-status">
        {micPermission ? (
          <div className="mic-active">
            <span className="mic-icon">🎤</span>
            <span className="mic-text">Microphone Active - Blow to extinguish candles!</span>
          </div>
        ) : (
          <div className="mic-inactive">
            <span className="mic-icon">🎤</span>
            <span className="mic-text">Please allow microphone access to blow candles</span>
          </div>
        )}
        
        {micPermission && (
          <div className="audio-indicator">
            <div className="blow-instruction">
              {audioLevel > 2000 ? '💨 Blow Harder!' : '💨 Blow into microphone'}
            </div>
            <div className="audio-bar-container">
              <div 
                className="audio-bar" 
                style={{ height: `${(audioLevel / 255) * 50}px` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCake; 