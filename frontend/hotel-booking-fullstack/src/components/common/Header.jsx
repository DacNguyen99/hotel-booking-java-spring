import React from "react";

const Header = ({ title }) => {
  return (
    <header className="header mb-4">
      <div className="overlay">
        <div className="container">
          <h1 className="header-title text-center mt-4">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
