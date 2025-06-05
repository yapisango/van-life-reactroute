import React from "react";
import Navbar from "../components/Navbar.jsx";

function About() {
  return (
    <>
      <Navbar />
      <img src="/images/about-hero.png" alt="About Us" className="about-hero-img" />
      <div className="about-page">
        <main>
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
        </main>

        <section className="about-cta">
          <p>Your destination is waiting.</p>
          <p>Your van is ready.</p>
          <button className="about-hero-btn">Find your van</button>
        </section>

        <footer className="about-footer">Ⓒ 2022 #VANLIFE</footer>
      </div>
    </>
  );
}

export default About;

