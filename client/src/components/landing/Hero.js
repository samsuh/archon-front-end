import React from "react";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="row">
        <div class="col s12 m10 offset-m1 center">
          <h5>Welcome to Archon (Hero)</h5>
          <h1>Stop Overpaying for Cloud Storage!</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
            officia cupiditate sit voluptatem provident doloribus quasi veniam
            illo neque iste!
          </p>
          <a
            href="#"
            className="btn btn-large white blue-text darken-3 waves-effect waves-teal"
          >
            Learn More
          </a>
          <a
            href="#"
            className="btn btn-large blue darken-3 white-text waves-effect waves-light"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
