import React from "react";
import { Link } from "react-router-dom"

function About() {
  return (
    <div className="about-page-container">
      <img src="/images/about-hero.png" alt="About Us" className="about-hero-img" />
      
        <div className="about-page-content">
          <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
          <p>
            Our mission is to enliven the adventurous spirit by offering a
            diverse selection of vans for every type of road trip. Whether you
            are looking for a cozy camper van or a spacious family van, we have
            the perfect vehicle for your journey.
          </p>
          <p>
            With our easy-to-use platform, you can find and book your ideal van
            in just a few clicks. Join the #vanlife movement and start your
            adventure today!
          </p>
        </div>
        <div className="about-page-cta">
          <h2>Your destination is waiting.<br />Your van is ready.</h2>
          <Link to="/vans" className="link-button">Find your van</Link>
        </div>

        <footer className="about-footer">Ⓒ 2022 #VANLIFE</footer>
    </div>
  );
}

export default About;

