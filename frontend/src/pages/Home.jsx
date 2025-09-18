import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>📚 Welcome to Book Mates</h1>
      <p>Exchange books with friends easily.</p>
      <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Home;
