'use client';

import { useEffect, useState } from 'react';
import styles from './PageLoader.module.css';

type Props = {
  children: React.ReactNode;
};

export default function PageLoader({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simula il caricamento progressivo
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Quando la pagina è completamente caricata
    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      
      // Aspetta un attimo per mostrare il 100%
      setTimeout(() => {
        setFadeOut(true);
        
        // Rimuovi il loader dopo l'animazione
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={`${styles.loader} ${fadeOut ? styles.fadeOut : ''}`}>
        <div className={styles.loaderContent}>
          <div className={styles.logoContainer}>
            <img src="/dog81.png" alt="DogHouse" className={styles.logo} />
            <img src="/tempio-logo.png" alt="Tempio" className={styles.logo} />
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className={styles.progressText}>
            {Math.round(progress)}%
          </div>
        </div>
      </div>
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        {children}
      </div>
    </>
  );
}
