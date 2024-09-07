import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";
const ServiceCard = ({ title, description, index, total }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"]);

  return (
    <motion.div ref={cardRef} className="service-card" style={{ x }}>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </motion.div>
  );
};

const TLSLandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { scrollY } = useScroll();
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const videoRef = useRef(null);

  const services = [
    {
      title: "E-Learning",
      description:
        "Custom-tailored learning experiences for your brand and products.",
    },
    {
      title: "Training",
      description:
        "Personalized training programs to enhance your sales team's skills.",
    },
    {
      title: "Design",
      description:
        "Innovative design solutions to elevate your brand presence.",
    },
  ];

  const textScale = useTransform(scrollY, [0, 600], [1, 1.5]);
  const textOpacity = useTransform(scrollY, [0, 300, 600], [1, 1, 0]);
  const videoOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  const slidingTextScale = useTransform(scrollY, [600, 700], [2, 1]);
  const slidingTextX = useTransform(scrollY, [700, 1000], ["0%", "-210%"]);
  const slidingTextOpacity = useTransform(
    scrollY,
    [600, 700, 1000, 1001],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress >= 99) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [loading]);

  useEffect(() => {
    if (canPlayVideo && !loading && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [canPlayVideo, loading]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("canplay", () => {
        setCanPlayVideo(true);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <h1 className="loading-percentage">{loadingProgress}%</h1>
          <div className="scrolling-text-container">
            <div
              className="scrolling-text"
              style={{
                transform: `translateX(${100 - loadingProgress}%)`,
              }}
            >
              Revolutionizing luxury sales training with Apple Vision Pro
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo-container">
          <span className="logo-text">TLS GROUP</span>
          <div className="logo-glow"></div>
        </div>
        <nav>
          <ul className="nav-list">
            <a href="#about" className="nav-link">
              ABOUT
            </a>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <motion.div className="hero-content">
            <motion.h1
              className="hero-title"
              style={{
                scale: textScale,
                opacity: textOpacity,
              }}
            >
              CHANGE YOUR <br />
              <span className="hero-title-highlight">WAY TO SELL</span>
            </motion.h1>
            <motion.div
              className="video-container"
              style={{ opacity: videoOpacity }}
            >
              <video
                ref={videoRef}
                className="background-video"
                muted
                playsInline
                onEnded={() => {
                  videoRef.current.pause();
                  videoRef.current.currentTime = videoRef.current.duration;
                }}
              >
                <source
                  src="https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/hero/large_2x.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            <motion.div
              className="sliding-text-container"
              style={{
                opacity: slidingTextOpacity,
                scale: slidingTextScale,
                x: slidingTextX,
              }}
            >
              <p className="sliding-text">
                Experience the future of sales training
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <section className="services-section">
        <h2 className="services-title">Our Services</h2>
        <div className="services-container">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              index={index}
              total={services.length}
            />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 TLS GROUP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TLSLandingPage;
