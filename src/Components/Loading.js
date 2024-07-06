import React from 'react';
import '../Syles/Loading.css';
import logo from '../Pictures/logo.png';

const Loading = () => {
  return (
    <div id="loading-screen">
      <div className="spinner">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Loading;
