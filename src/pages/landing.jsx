import "../styles/landing.css";
import "../root.css";
import HeroImg from "../../public/images/landing img.jpg";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="App">
      <div className="body-cont">
        <img src={HeroImg} alt="main-page-img" className="hero-img" />
        <div className="content-box">
          <Link to="/homepage" className="landing-style">
            <button className="landing-btn">Watch Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Landing };
