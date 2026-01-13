import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      
      {/* 1. SECTION: HERO (Görseldeki gibi etkileyici karşılama) */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Small Steps, Great Changes.</h1>
          <p>
            Every helping hand creates a new story of hope. We believe that collective action 
            can overcome the greatest challenges. Join our global community today to make 
            the world a better, more compassionate place for everyone.
          </p>
          <div className="hero-btns">
            {/* link kullanmamızın sebebi akıcı olması a hrefle akıcı olmaz */}
            <Link to="/donation" className="btn-main">Donate Now</Link>
            <Link to="/events" className="btn-secondary">Explore Events</Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION: IMPACT METRICS (Rakamlarla Güven) */}
      <section className="metrics-bar">
        <div className="metric-item">
          <h2>10K+</h2>
          <p>People Helped</p>
        </div>
        <div className="metric-item">
          <h2>50+</h2>
          <p>Active Projects</p>
        </div>
        <div className="metric-item">
          <h2>100%</h2>
          <p>Transparency</p>
        </div>
      </section>

      {/* 3. SECTION: DETAILED PROCESS (Yazı ağırlıklı anlatım) */}
      <section className="process-detailed">
        <h2 className="main-title">The Journey of Your Contribution</h2>
        <div className="text-grid">
          <div className="text-block">
            <h3>1. Secure and Direct Funding</h3>
            <p>
              When you choose to support a cause, your contribution is processed through 
              our high-security encrypted system. We ensure that every cent is earmarked 
              specifically for the project you've selected, preventing any loss during 
              the administrative transition. Our commitment starts with protecting your trust.
            </p>
          </div>
          <div className="text-block">
            <h3>2. Transparent Allocation</h3>
            <p>
              Transparency is not just a word for us; it is our operational core. 
              We provide detailed digital ledgers where you can monitor how funds 
              are allocated to field teams. From purchasing supplies to logistics, 
              every expense is documented and made available for our donors to review at any time.
            </p>
          </div>
          <div className="text-block">
            <h3>3. Verifiable Field Impact</h3>
            <p>
              The final stage of your donation is the transformation it creates. 
              We deploy independent observers and local coordinators to capture 
              the progress. You will receive comprehensive impact reports, including 
              visual documentation and testimonials from the families whose lives 
              have been touched by your generosity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION: EXTENDED MISSION (Samimi ve Uzun Hikaye) */}
      <section className="mission-extended">
        <div className="mission-content">
          <div className="mission-visual">
            <img src="/images/grupuye.jpg" alt="Our Team" />
          </div>
          <div className="mission-prose">
            <h2>Our Story & Global Vision</h2>
            <p>
              "A Word of Goodness" was founded on a simple yet profound realization: 
              kindness is universal, but the bridges connecting resources to needs are often broken. 
              What started as a small local initiative has now grown into a global network of volunteers, 
              experts, and donors dedicated to sustainable change.
            </p>
            <p>
              Our vision extends beyond temporary relief. We aim to build self-sustaining communities 
              by investing in education, clean water infrastructure, and local leadership. 
              We don't just provide aid; we provide the tools for a dignified future. 
              Every project we undertake is vetted for long-term viability and ethical standards.
            </p>
            <Link to="/login" className="btn-text-link">Join our mission and become part of the story →</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;