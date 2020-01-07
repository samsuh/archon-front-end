import React from "react";

const About = () => {
  return (
    <section className="section section-about grey lighten-4">
      <div className="container">
        <div className="div row">
          <div className="col s12 m6">
            <h3>
              <span className="blue-text text-darken-3">About </span>Us
            </h3>
            <p className="flow-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              dolor voluptates necessitatibus totam sit odit consequuntur
              perspiciatis distinctio numquam consectetur!
            </p>
          </div>
          <div class="col s12 m6">
            <img
              src={require("../../img/tech.jpg")}
              alt=""
              className="materialboxed responsive-img"
              data-caption="Archon is awesome"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
