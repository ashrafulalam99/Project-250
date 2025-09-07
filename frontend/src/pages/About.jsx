import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./About.css";

export default function About() {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="about-container">
        <h1>About Us</h1>
        <p className="intro">
          Welcome to our CampusHub App! This project is developed as part of
          our academic curriculum with the objective of learning and practicing
          modern web and mobile application development.
        </p>

        <div className="team-section">
          <h2>Our Developers</h2>
          <ul>
            <li>👨‍💻 Hasin Ishrak</li>
            <li>👨‍💻 Ashraful Alam</li>
          </ul>
        </div>

        <div className="contact-section">
          <h2>Contact Us</h2>
          <p>
            🌐 Facebook:{" "}
            <a
              href="https://www.facebook.com/ashraful.alam.931253"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ashraful Alam
            </a>
          </p>

          <p>
            🌐 Facebook:{" "}
            <a
              href="https://www.facebook.com/hasin.ishrak.723459"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hasin Ishrak
            </a>
          </p>

        </div>
      </main>
      <Footer />
    </div>
  );
}
