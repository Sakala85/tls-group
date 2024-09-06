import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css"; // Make sure to create this CSS file

const CyberpunkLandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = setTimeout(() => setLoading(false), 1300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="cyberpunk-landing">
      <header>
        <motion.div
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          TLS GROUP
        </motion.div>
        <nav>
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            About
          </motion.a>
          <motion.a
            href="#services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Services
          </motion.a>
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Contact
          </motion.a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">CHANGE YOUR</span>
            <span className="text-highlight">WAY TO SELL</span>
          </motion.h1>
          <motion.p
            className="subheading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            REVOLUTIONIZING LUXURY SALES WITH APPLE VISION PRO
          </motion.p>
          <motion.button
            className="discover-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DISCOVER MORE <span className="arrow">→</span>
          </motion.button>
        </section>

        <AppleVisionProModel />

        <motion.section
          className="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY > 300 ? 1 : 0 }}
        >
          <div className="feature">
            <h2>Immersive Training</h2>
            <p>Experience luxury products in stunning detail</p>
          </div>
          <div className="feature">
            <h2>Enhanced Sales Techniques</h2>
            <p>Master cutting-edge strategies in VR</p>
          </div>
        </motion.section>

        <motion.section
          className="testimonial"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY > 600 ? 1 : 0 }}
        >
          <blockquote>
            "TLS Group transformed our sales approach. The Apple Vision Pro
            training is revolutionary."
          </blockquote>
          - Luxury Brand CEO
        </motion.section>
      </main>

      <footer>
        <div className="scroll-progress">
          <motion.div
            className="progress-bar"
            style={{
              scaleX:
                scrollY / (document.body.scrollHeight - window.innerHeight),
            }}
          />
        </div>
        <div className="scroll-text">Scroll progress</div>
      </footer>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-icon"></div>
    <p>Initializing Future of Sales...</p>
  </div>
);

const AppleVisionProModel = () => (
  <motion.div
    className="vision-pro-model"
    animate={{ rotateY: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <img
      src="visionPro.png"
      alt="Apple Vision Pro"
      className="placeholder-model"
    />
  </motion.div>
);

export default CyberpunkLandingPage;
