import React from "react";
import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section className="link-page">
      <h1>Links</h1>
      <div className="link-group">
        <h2>Public</h2>
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
      </div>
      <div className="link-group">
        <h2>Private</h2>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/dragAndDropUser" className="link">
          Editors Page
        </Link>
        <Link to="/draganddrop" className="link">
          Admin Page
        </Link>
      </div>
    </section>
  );
};

export default LinkPage;
