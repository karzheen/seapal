import React, { useState, useEffect } from 'react';

const LoadingBar = ({ isAssetsLoaded, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          if (onComplete) onComplete(); 
          return 100;
        }

        // If assets are fully loaded by the browser, skip straight to 100%
        if (isAssetsLoaded) {
          return 100;
        }

        // Otherwise, smoothly fake progress between 1% and 3% increments
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(oldProgress + increment, 99); // Hold at 99% until assets load
      });
    }, 40); 

    return () => clearInterval(timer);
  }, [isAssetsLoaded, onComplete]);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.text}>{progress}%</div>
        <div style={styles.track}>
          <div style={{ ...styles.bar, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#121212', 
    zIndex: 99999, // Floating on top of your entire page layout
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  track: {
    width: '300px',
    height: '6px',
    backgroundColor: '#333333',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#ffffff', // Clean white bar or choose your own primary brand color
    transition: 'width 0.1s ease-out',
  },
};

export default LoadingBar;
