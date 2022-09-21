import "../css/index.css";

function Home() {
  return (
    <div>
      <section className="section">
        <div className="box-main">
          <div className="firstHalf">
            <h1 className="text-big">
              Welcome to the new joiner cohort of 2022!
            </h1>
            <p className="text-small">
              Congratulations for making it! This app is designed to provide you
              with all the information you will need to thrive in the workplace.
              Below are all the details of the various schemes that your fellow
              new joiners will be on.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="box-main">
          <div className="secondHalf">
            <h1 className="text-big" id="program">
              Product Scheme
            </h1>
            <p className="text-small">
              This is what you'll do on the Product Scheme!
            </p>
          </div>
        </div>
      </section>
      <div className="section">
        <section className="section">
          <div className="box-main">
            <div className="secondHalf">
              <h1 className="text-big" id="program">
                UX Scheme
              </h1>
              <p className="text-small">
                This is what you'll do on the UX Scheme!
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="box-main">
            <div className="secondHalf">
              <h1 className="text-big" id="program">
                Tech Scheme
              </h1>
              <p className="text-small">
                This is what you'll do on the UX Scheme!
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="box-main">
            <div className="secondHalf">
              <h1 className="text-big" id="program">
                Data Science Scheme
              </h1>
              <p className="text-small">
                This is what you'll do on the Data Science Scheme!
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p className="text-footer">Copyright ©-Yellow Team</p>
      </footer>
    </div>
  );
}

export default Home;
