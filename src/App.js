import React, { useEffect, useRef, useState } from 'react';
import PandalLights from './PandalLights';
import './App.css';

const generateLanterns = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 5;
    const delay = Math.random() * 5;
    return (
      <div
        key={i}
        className="lantern"
        style={{
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      ></div>
    );
  });
};

function App() {
  const audioRef = useRef(null);
  const contextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [pulse, setPulse] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const audio = new Audio('/Sakala_Sathama_Bodu_Bathiyen_Mohideen_Beg_Sarigama_lk.mp3');
    audio.loop = true;
    audioRef.current = audio;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(context.destination);

    contextRef.current = context;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const checkBeat = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setPulse(average > 120);
    };

    const interval = setInterval(checkBeat, 100);

    const handleClick = () => {
      setClickCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 1) {
          context.resume(); // Initialize AudioContext on first click
        } else if (newCount === 2) {
          audio.play(); // Play the audio on second click
          window.removeEventListener('click', handleClick);
        }
        return newCount;
      });
    };

    window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="app">
      <div className="lanterns">
        {generateLanterns(15).map((lantern, i) => (
          <div key={i} className={`lantern ${pulse ? 'pulse' : ''}`} style={lantern.props.style} />
        ))}
      </div>
      <div className="content">
        <h1 className="title">Vesak Pandal with Animated Lights</h1>
        <PandalLights />
        <footer className="footer">
          ☘️ Wishing you peace and enlightenment on this Vesak Poya Day ☘️
        </footer>
      </div>
    </div>
  );
}

export default App;
