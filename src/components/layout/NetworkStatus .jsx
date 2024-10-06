import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Initial state based on the current network status

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true); // Update state to show offline status
    };

    const handleOnline = () => {
      setIsOffline(false); // Update state to show online status
    };

    // Listen for offline/online events
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) {
    return null; // If online, do not render anything
  }

  return (
    <div style={offlineStyle}>
      <p style={{ margin: 0 }}>You are currently offline. Please check your connection.</p>
    </div>
  );
};

// Simple styling for the offline message
const offlineStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  height : '100vh',
  backgroundColor: 'black',
  color: 'white',
  textAlign: 'center',
  padding: '10px',
  zIndex: 1000,
  fontWeight: 'bold'
};

export default NetworkStatus;
