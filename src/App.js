import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const [showGame, setShowGame] = useState(false);

  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: "Build/CollegeNevigationBuild.loader.js", 
    dataUrl: "Build/CollegeNevigationBuild.data",
    frameworkUrl: "Build/CollegeNevigationBuild.framework.js",
    codeUrl: "Build/CollegeNevigationBuild.wasm",
  });

  // Full screen function
  const handleFullscreen = () => {
    if (isLoaded) {
      requestFullscreen(true);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* --- HEADER --- */}
      <header style={styles.header}>
        <div style={styles.logo}>PRMITR Amravati</div>
      </header>

      {/* --- HERO SECTION --- */}
      {!showGame && (
        <div style={styles.hero}>
          <h1 style={styles.title}>Welcome to PRMITR</h1>
          <p style={styles.subtitle}>Prof. Ram Meghe Institute of Technology & Research, Badnera</p>
          
          <div style={styles.detailsBox}>
            <p>Explore our state-of-the-art campus in a fully interactive 3D environment. 
               Navigate through departments, labs, and student hubs right from your browser.</p>
          </div>

          <button
            style={styles.demoButton}
            onClick={() => setShowGame(true)}
          >
            🎮 Demo — Explore Campus
          </button>
        </div>
      )}

      {/* --- UNITY GAME SECTION --- */}
      {showGame && (
        <div style={styles.gameContainer}>

          {/* Loading Bar */}
          {!isLoaded && (
            <div style={styles.loadingContainer}>
              <p style={styles.loadingText}>Loading Campus Architecture...</p>
              <div style={styles.loadingBarBg}>
                <div style={{
                  ...styles.loadingBarFill,
                  width: `${loadingProgression * 100}%`
                }} />
              </div>
              <p style={styles.loadingPercent}>
                {Math.round(loadingProgression * 100)}%
              </p>
            </div>
          )}

          {/* Unity Canvas */}
          <Unity
            unityProvider={unityProvider}
            style={{
              width: "100%",
              height: "100vh",
              display: isLoaded ? "block" : "none"
            }}
          />

          {/* Game Controls (Back & FullScreen) */}
          {isLoaded && (
            <div style={styles.controlsOverlay}>
              <button style={styles.backButton} onClick={() => setShowGame(false)}>
                ← Back
              </button>
              <button style={styles.fullScreenButton} onClick={handleFullscreen}>
                ⛶ Full Screen
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- FOOTER --- */}
      {!showGame && (
        <footer style={styles.footer}>
          <p>© 2026 PRMITR Amravati | Developed for Virtual Campus Tour</p>
        </footer>
      )}

    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "20px 40px",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderBottom: "1px solid #333",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
    letterSpacing: "1px",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    color: "white",
    textAlign: "center",
    padding: "0 20px",
    marginTop: "80px", // Header space
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "10px",
    background: "linear-gradient(to right, #fff, #2563eb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.3rem",
    color: "#aaaaaa",
    marginBottom: "20px",
  },
  detailsBox: {
    maxWidth: "600px",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "40px",
    lineHeight: "1.6",
    color: "#cccccc",
  },
  demoButton: {
    padding: "18px 56px",
    fontSize: "1.2rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s, background 0.2s",
    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "0.9rem",
    borderTop: "1px solid #1a1a1a",
  },
  gameContainer: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white",
  },
  loadingBarBg: {
    width: "300px",
    height: "8px",
    backgroundColor: "#222",
    borderRadius: "10px",
    overflow: "hidden",
  },
  loadingBarFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    transition: "width 0.4s ease-out",
  },
  controlsOverlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    display: "flex",
    flexDirection:"row",
    gap: "10px",
    zIndex: 100,
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    border: "1px solid #444",
    borderRadius: "6px",
    cursor: "pointer",
  },
  fullScreenButton: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;