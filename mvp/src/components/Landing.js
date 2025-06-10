import React from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useTypewriter } from "react-simple-typewriter";

export function Landing() {
    let navigate = useNavigate();
    const [text] = useTypewriter({
        words: [" a gamified approach to mental wellness"],
        loop: true,
        deleteSpeed: 0,     
        typeSpeed: 110,
    });

      return (
        <div className="landing-wrapper">
    
          {/* Hero Section */}
          <section className="landing-hero">
            <img src="landingheaderimage.png" alt="Background" className="landing-hero-bg" />
            <h1 className="landing-title">Pawse</h1>
            <div className="typewriter-container">
                <span className="typewriter-text">{text}</span>
                <span className="invisible-placeholder"> a gamified approach to mental wellness</span>
            </div>
            <img className="scroll-arrow" src="chevron.png"></img>
            <p className="login-prompt">Already have an account? <Link to="/login" className="landing-login-btn">Sign In</Link></p>
          </section>
    
          {/* About Section */}
          <section className="landing-about">
            <h2>About</h2>
            <p className="about-text">
              Pawse is a web application designed to encourage Gen Z to be more proactive about their mental wellness.
              Pawse blends "pause," representing the support and comfort pets bring, with "paws" as a reminder to take intentional moments for self-care.
            </p>
            <img src="about-pets.png" alt="Pets" className="about-img" />
          </section>
    
          {/* Key Features Section */}
          <section className="landing-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <img src="checkin-icon.png" alt="Checkin" />
                <h3>Daily Check in</h3>
                <p>Users are encouraged to take a moment to tune into how they are feeling.</p>
              </div>
              <div className="feature-item">
                <img src="diary-icon.png" alt="Diary" />
                <h3>Daily Diary</h3>
                <p>Users write beyond a quick check in by expressing their thoughts and experiences.</p>
              </div>
              <div className="feature-item">
                <img src="rewards-icon.png" alt="Rewards" />
                <h3>Gamified Rewards</h3>
                <p>Earn coins through wellness activities and redeem them in the store.</p>
              </div>
              <div className="feature-item">
                <img src="insights-icon.png" alt="Insights" />
                <h3>Personalized Insights</h3>
                <p>Custom reports help users understand patterns and progress.</p>
              </div>
            </div>
          </section>
    
          {/* How to Use Section */}
          <section className="landing-howto">
            <h2>How to Use Pawse</h2>
            <div className="video-placeholder">[Video tutorial placeholder - 100vh]</div>
          </section>
    
          {/* Closing Section */}
          <section className="landing-join">
            <img src="pawsitive-message.png" alt="Pawsitive Message" />
            <button className="join-button" onClick={() => navigate('/login')}>Enter Pawse</button>      </section>
    
          {/* Creators Section */}
          <section className="landing-creators">
            <h2>Meet the Creators</h2>
            <p className="creators-description">Pawse was created by a group of students from UW...</p>
            <div className="creators-grid">
              <div className="creator">
                <img src="clarabelle.png" alt="Clarabelle" />
                <p>Clarabelle<br />Project Manager</p>
              </div>
              <div className="creator">
                <img src="sara.png" alt="Sara" />
                <p>Sara<br />Full Stack Developer</p>
              </div>
              <div className="creator">
                <img src="aliya.png" alt="Aliya" />
                <p>Aliya<br />Full Stack Developer</p>
              </div>
              <div className="creator">
                <img src="srishti.png" alt="Srishti" />
                <p>Srishti<br />UX/UI Designer</p>
              </div>
              <div className="creator">
                <img src="melanie.png" alt="Melanie" />
                <p>Melanie<br />UX/UI Designer</p>
              </div>
            </div>
          </section>
    
          {/* Disclaimer */}
          {/* <footer className="landing-footer">
            <p>This app is for support purposes only and not a substitute for medical care...</p>
            <p className="footer-note">© Pawse 2025. Created by Clarabelle, Sara, Aliya, Srishti, Melanie.</p>
          </footer> */}
        </div>
    );
}
    


 