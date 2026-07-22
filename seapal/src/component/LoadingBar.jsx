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

        // If your browser finished downloading your images, push it instantly to 100%
        if (isAssetsLoaded) {
          return 100;
        }

        // Simulates realistic progressive loading
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(oldProgress + increment, 99); 
      });
    }, 30); 

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
    backgroundColor: '#f5f2eb', // Custom off-white background color matching your screenshot
    zIndex: 999999, 
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
    color: '#1a1a1a',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontFamily: 'serif', // Fits the clean aesthetic of your site layout
  },
  track: {
    width: '250px',
    height: '4px',
    backgroundColor: '#e0dbd3',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#1a1a1a', 
    transition: 'width 0.1s ease-out',
  },
};

export default LoadingBar;
