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
          <div className="landing-content">

          {/* Hero Section */}
          <section className="landing-hero">
            <img src="landingheaderimage.png" alt="Background" className="landing-hero-bg" />
            <h1 className="landing-title">Pawse</h1>
            <div className="typewriter-container">
                <span className="typewriter-text">{text}<span className="typewriter-cursor"> |</span></span>
                <span className="invisible-placeholder"> a gamified approach to mental wellness</span>
            </div>
            <img className="scroll-arrow" src="chevron.png"></img>
            <p className="login-prompt">Already have an account? <Link to="/login" className="landing-login-btn">Sign In</Link></p>
          </section>
    
          {/* About Section */}
          <section className="landing-about">
            <div className="about-text-group">
              <h2 className="about-header">About</h2>
              <p className="about-text">
                Pawse is a web application designed to encourage Gen Z to be more proactive about their mental wellness. 

                Pawse blends “paws,” representing the support and comfort pets bring, with “pause,” a reminder to take 
                intentional moments for self-care and mental reflection throughout the day. 

                Through personalized resources, a gamified mental wellness model, and evidence-based tools, 
                Pawse empowers users to develop self-awareness, cultivate healthy coping strategies, and build confidence. 

                By fostering a culture of self-care and reflection, Pawse makes a meaningful impact in the lives of Gen Z - 
                equipping them with the tools they need to navigate their mental wellness with confidence and resilience.
              </p>
            </div>
            <img src="landing-about-img.png" alt="Pets" className="about-img" />
          </section>

    
          {/* Key Features Section */}
          <section className="landing-features">
            <h2 className="landing-features-header">Key Features</h2>
            <p className="landing-features-text">
              Gen Z is twice as likely to experience depression and feelings of hopelessness compared to those over 26. 
              Poor mental health is especially common among Gen Z and often has negative effects on productivity, social relationships, and overall quality of life. 
              Pawse is designed to encourage users to regularly track their mood, emotions, and thoughts, supporting mental wellness through structured reflection and self-discovery.
            </p>

            <div className="feature-row">
              <div className="feature-text">
                <h3 className="feature-headings">Daily Check In</h3>
                <p className="feature-paragraphs">Users are encouraged to take a moment to tune into how they’re feeling, fostering emotional awareness and self-reflection.</p>
              </div>
              <img src="features-checkin.png" alt="Checkin" className="feature-img" />
            </div>

            <div className="feature-row">
            <img src="features-diary.png" alt="Diary" className="feature-img2" />
              <div className="feature-text">
                <h3 className="feature-headings">Daily Diary</h3>
                <p className="feature-paragraphs">Users are invited to go beyond a quick check in by expressing their thoughts, experiences, and reflections in a more detailed, diary-style format. This practice encourages more thoughtful self-reflection and tracks personal growth over time.</p>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-text">
                <h3 className="feature-headings">Gamified Rewards</h3>
                <p className="feature-paragraphs">Users earn coins by completing daily wellness activities, which can be used to purchase virtual pet items in the Store. This reward system reinforces consistent engagement and makes self-care both fun and motivating.</p>
              </div>
              <img src="features-rewards.png" alt="Rewards" className="feature-img" />
            </div>

            <div className="feature-row">
            <img src="features-insights.png" alt="Insights" className="feature-img2" />
              <div className="feature-text">
                <h3 className="feature-headings">Personalized Insights</h3>
                <p className="feature-paragraphs">Users can view customized reports that summarize their mood patterns and diary entries. These insights help users recognize trends, track progress, and gain a deeper understanding of their mental wellness over time.</p>
              </div>
            </div>
          </section>
    
          {/* How to Use Section */}
          <section className="landing-howto">
            <h2 className="landing-howto-header">How to Use Pawse</h2>
            <div className="video-placeholder">[Video tutorial placeholder - 100vh]</div>
          </section>
    
          {/* Closing Section */}
          <section className="landing-join">
            <img src="landing-img-try.jpg" alt="Pawsitive Image" className="landing-img-try" />
            <div className="landing-join-content">
              <img className="landing-img-logo" src="landing-logo.png" />
              <p className="landing-try-msg">
                Take a moment to unwind and reflect – Pawse turns mental wellness into a fun, rewarding, and <em>pawsitive</em> daily ritual.
              </p>
              <button className="join-button" onClick={() => navigate('/login')}>Try Pawse today</button>
            </div>
          </section>
    
          {/* Creators Section */}
          <section className="landing-creators">
            <h2 className="landing-creators-header">Meet the Creators</h2>
            <p className="creators-description">Pawse was created by a group of 5 students at the University of Washington for their senior capstone project. Passionate about mental health and wellness, they decided to create Pawse as a fun resource to encourage Gen Z individuals to prioritize their mental wellbeing.</p>
            <div className="creators-grid">
            <div className="creator">
              <img src="clarabelle.png" alt="Clarabelle" />
              <p>
                <span className="creator-name">Clarabelle</span><br />
                Project Manager<br />
                Full Stack Engineer<br />
                Lead UX/UI Designer
              </p>
            </div>
            <div className="creator">
              <img src="sara.png" alt="Sara" />
              <p>
                <span className="creator-name">Sara</span><br />
                Full Stack Engineer<br />
              </p>
            </div>
            <div className="creator">
              <img src="aliya.png" alt="Aliya" />
              <p>
                <span className="creator-name">Aliya</span><br />
                Full Stack Engineer<br />
              </p>
            </div>
            <div className="creator">
              <img src="srishti.png" alt="Srishti" />
              <p>
                <span className="creator-name">Srishti</span><br />
                UX/UI Designer<br />
                Project Coordinator
              </p>
            </div>
            <div className="creator">
              <img src="melanie.png" alt="Melanie" />
              <p>
                <span className="creator-name">Melanie</span><br />
                UX/UI Designer<br />
                Project Coordinator
              </p>
            </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="landing-disclaimer">
            <h2 className="landing-creators-header">Disclaimer</h2>
            <p className="creators-description">This app is for support purposes only and is not a substitute for medical or mental health advice, diagnosis, or treatment by a licensed healthcare provider. 
            If you are experiencing a mental health crisis or need urgent help, please contact a licensed professional or emergency services immediately. 
            Always consult a qualified healthcare provider regarding any questions or concerns about your mental health.</p>
          </section>
          </div>

          {/* Footer */}
          <footer className="landing-footer">
            <p className="footer-note">© Pawse 2025. Created by Clarabelle, Sara, Aliya, Srishti, and Melanie. All Rights Reserved.</p>
          </footer>
        </div>
    );
}
    


 