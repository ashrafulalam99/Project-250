import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Home.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-left">
          <h2>
            Find & <span className="highlight">Recover</span> with Ease
          </h2>
          <p>Experience effortless Campus Life with our dedicated service.</p>
        </div>
        <div className="home-right">
          <button className="lost-btn" onClick={() => navigate('/lost')}>Lost</button>
          <button className="found-btn" onClick={() => navigate('/found')}>Found</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
