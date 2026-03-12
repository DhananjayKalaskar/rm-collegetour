import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const [showGame, setShowGame] = useState(false);

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/CollegeNevigationBuild.loader.js",       // ← change MyBuild to your actual file name
    dataUrl: "Build/CollegeNevigationBuild.data",
    frameworkUrl: "Build/CollegeNevigationBuild.framework.js",
    codeUrl: "Build/CollegeNevigationBuild.wasm",
  });

  return (
    <div style={styles.container}>

      {/* HERO SECTION */}
      {!showGame && (
        <div style={styles.hero}>
          <h1 style={styles.title}>PRMITR College</h1>
          <p style={styles.subtitle}>Explore our campus in 3D</p>
          <button
            style={styles.demoButton}
            onClick={() => setShowGame(true)}
          >
            🎮 Demo — Explore Campus
          </button>
        </div>
      )}

      {/* UNITY GAME SECTION */}
      {showGame && (
        <div style={styles.gameContainer}>

          {/* Loading Bar */}
          {!isLoaded && (
            <div style={styles.loadingContainer}>
              <p style={styles.loadingText}>Loading Campus...</p>
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

          {/* Back Button */}
          {isLoaded && (
            <button
              style={styles.backButton}
              onClick={() => setShowGame(false)}
            >
              ← Back
            </button>
          )}

        </div>
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
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#aaaaaa",
    marginBottom: "40px",
  },
  demoButton: {
    padding: "16px 48px",
    fontSize: "1.2rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
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
  loadingText: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  loadingBarBg: {
    width: "300px",
    height: "12px",
    backgroundColor: "#333",
    borderRadius: "6px",
    overflow: "hidden",
  },
  loadingBarFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: "6px",
    transition: "width 0.3s ease",
  },
  loadingPercent: {
    marginTop: "10px",
    color: "#aaaaaa",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 20px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    border: "1px solid white",
    borderRadius: "6px",
    cursor: "pointer",
    zIndex: 100,
  },
};

export default App;