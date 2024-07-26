import React from 'react';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginTop: '50px' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nGdAvCOUZpZgQy3kDvHSzUWsR4WNnSWhYntSGP5fpw&s" alt="Homepage Image" style={{ maxWidth: '100%', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }} />
      </div>
      <div style={{ marginTop: '30px' }}>
        <h1 style={{ color: '#333', fontSize: '36px' }}>Welcome to Our Website!</h1>
        <p style={{ color: '#333', fontSize: '18px', lineHeight: '1.5' }}>The Sidama National Regional State Science and Technology Agency, based in Awasa, Ethiopia, works to advance science and technology within the region. Their efforts likely encompass science education, research initiatives, and technological development projects aimed at improving the lives of Sidama residents.</p>
      </div>
    </div>
  );
};

export default HomePage;
