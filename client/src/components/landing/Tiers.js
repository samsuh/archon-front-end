import React from "react";

const Tiers = () => {
  return (
    <section className="section section-tiers">
      <div className="container">
        <div className="row">
          <div className="col s12 m4">
            <div className="card-panel center">
              <i className="material-icons large blue-text text-darken-3">
                group
              </i>
              <h5 class="grey-text text-darken-4">Free Account</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, odit?
              </p>
            </div>
          </div>
          <div className="col s12 m4 center">
            <div className="card-panel">
              <i className="material-icons large blue-text text-darken-3">
                all_inclusive
              </i>
              <h5 class="grey-text text-darken-4">Unlimited Capacity</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, odit?
              </p>
            </div>
          </div>
          <div className="col s12 m4 center">
            <div className="card-panel">
              <i className="material-icons large blue-text text-darken-3">
                cloud_download
              </i>
              <h5 class="grey-text text-darken-4">Fast Retrieval</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, odit?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tiers;
