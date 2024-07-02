import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './about.css'; // Import your CSS file
import slider1 from "../img/Slider-img1.jpg";
import slider2 from "../img/Slider-img2.jpg";
import aboutImg1 from "../img/about-img1.jpg";
import aboutImg2 from "../img/about-img2.jpg";
import aboutImg3 from "../img/about-img3.png";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";
import img6 from "../img/img6.jpg";
import img7 from "../img/img7.jpg";
import img8 from "../img/img8.jpg";
import img9 from "../img/img9.jpg";
import img10 from "../img/img10.jpg";
import shadowImg from "../img/Shadow-img.png";
import Layout from "../components/Layout";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('cont-1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMoreDetailsClick = () => {
    // Scroll to the About section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Layout>
        <div className="DesignHolder">
          <header>
            <div className="Center">
              <div className="site-logo">
                <h2> <Link to="/">back</Link> </h2>
              
              </div>
            </div>
          </header>

          {/* Banner section */}
          <div className="Banner_sec" id="home">
            <div className="Center">
              <div className="leftside">
                <h3>Har Har<span>Mahadev</span></h3>
                <p>Temple of Lord Shiva</p>
                <button onClick={handleMoreDetailsClick} className="more-details-btn">
                  MORE DETAILS
                </button>
              </div>

              <div className="rightside">
                <ul id="slider">
                  <li>
                    <div className="Slider">
                      <figure>
                        <img src={slider1} alt="Slider Image 1" />
                      </figure>
                      <div className="text">
                        <div className="Icon"></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="Slider">
                      <figure>
                        <img src={slider2} alt="Slider Image 2" />
                      </figure>
                      <div className="text"></div>
                    </div>
                  </li>
                  <li>
                    <div className="Slider">
                      <figure>
                        <img src={aboutImg1} alt="Slider Image 2" />
                      </figure>
                      <div className="text"></div>
                    </div>
                  </li>
               
                </ul>
                <figure>
                  <img src={shadowImg} alt="Shadow Image" className="Shadow" />
                </figure>
              </div>
            </div>
          </div>

          {/* About us section */}
          <div className="About_sec" id="about">
            <div className="Center">
              <h2>About Us</h2>
              <div className="Line"></div>
              <div className="Tabside">
                <ul>
                  <li>
                    <Link to="#" className={`tabLink ${activeTab === 'cont-1' ? 'activeLink' : ''}`} onClick={() => handleTabClick('cont-1')}>
                      Information
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className={`tabLink ${activeTab === 'cont-2' ? 'activeLink' : ''}`} onClick={() => handleTabClick('cont-2')}>
                      Trustees
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className={`tabLink ${activeTab === 'cont-3' ? 'activeLink' : ''}`} onClick={() => handleTabClick('cont-3')}>
                      Donors
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className={`tabLink ${activeTab === 'cont-4' ? 'activeLink' : ''}`} onClick={() => handleTabClick('cont-4')}>
                      Expenses
                    </Link>
                  </li>
                </ul>
                <div className="clear"></div>
                <div className="tabcontent" id="cont-1" style={{ display: activeTab === 'cont-1' ? 'block' : 'none' }}>
                  <div className="TabImage">
                    <div className="about-img1">
                      <figure>
                        <img src={aboutImg1} alt="About Image 1" />
                      </figure>
                    </div>
                  </div>
                  <div className="Description">
                    <h3>Introduction</h3>
                    <p>
                      GSFC (Sikka Unit) has started its DAP Production in
                      1987 at Motikhavdi on Jamnagar - Dwarka highway at a
                      distance of around 27 Kms, from Jamnagar. The company
                      has also constructed its own township having 192
                      quarters near to the plant for the residents of officers
                      and staff. It was decided to construct a temple inside
                      the township so that the residents of the colony can
                      actively take part in the religious overall activity. For
                      the purpose, a Fertilizer Township Charitable Trust was
                      established in 1989 having its Registration No. E-796
                      Jamnagar dtd.10.02.1989. All the employees are
                      contributing every month. With the donations from
                      well-wishers who came forward from time to time and as a
                      result, a “Shiva Temple” was constructed and its Pran
                      Pratishtha was celebrated on “Mahashivratri day” i.e. on
                      25.02.1998. As per the plan, the construction of other 7
                      small temples dedicated to various gods, goddesses also
                      completed around the main “Shiva Temple” in the year
                      2004. The “Pran Pratishtha Mahotsav” of these 7 temples
                      was celebrated from 31.10.04 to 02.11.04.
                    </p>
                  </div>
                </div>

                <div className="tabcontent hide" id="cont-2" style={{ display: activeTab === 'cont-2' ? 'block' : 'none' }}>
                  <div className="TabImage">
                    <div className="about-img1">
                      <figure>
                        <img src={aboutImg2} alt="Trustees Image" />
                      </figure>
                    </div>
                  </div>
                  <div className="Description">
                    <h3>Names of Trustees:</h3>
                    <p>
                      Shri GM Patel - Chairman <br />
                      Shri AJ Kulabkar - Secretary <br /> Shri PD Rindani -
                      Treasurer <br /> Shri SA Desai - Member <br /> Shri MM
                      Patel <br /> Shri MJ Acharya <br /> Shri PA Pandya <br />
                      Shri AN Gohil <br /> Shri RL Dandekar <br /> Shri MS
                      Bhatt <br /> Shri RM Rathod <br /> Shri MB Desai
                    </p>
                  </div>
                </div>

                <div className="tabcontent hide" id="cont-3" style={{ display: activeTab === 'cont-3' ? 'block' : 'none' }}>
                  <div className="TabImage">
                    <div className="about-img1">
                      <figure>
                        <img src={aboutImg3} alt="Donors Image" />
                      </figure>
                    </div>
                  </div>
                  <div className="Description">
                    <h3>Donations:</h3>
                    <p>
                      3%-Income Golakh <br /> 10%-Donation through the salary
                      of employees <br /> 12%-Interest <br /> 75%-Donation by
                      the worshippers.
                    </p>
                  </div>
                </div>

                <div className="tabcontent hide" id="cont-4" style={{ display: activeTab === 'cont-4' ? 'block' : 'none' }}>
                  <div className="TabImage">
                    <div className="about-img1">
                      <figure>
                        <img src={aboutImg3} alt="Expenses Image" />
                      </figure>
                    </div>
                  </div>
                  <div className="Description">
                    <h3>Expenses</h3>
                    <p>
                      Your expenses details here.
                    </p>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>

          {/* Gallery section */}
          <div className="Services_sec" id="services">
            <div className="Center">
              <h1>Gallery</h1>
              <div className="image-container">
                <div className="image">
                  <img src={img1} alt="Gallery Image 1" />
                </div>
                <div className="image">
                  <img src={img2} alt="Gallery Image 2" />
                </div>
                <div className="image">
                  <img src={img3} alt="Gallery Image 3" />
                </div>
                <div className="image">
                  <img src={img4} alt="Gallery Image 4" />
                </div>
                <div className="image">
                  <img src={img5} alt="Gallery Image 5" />
                </div>
                <div className="image">
                  <img src={img6} alt="Gallery Image 6" />
                </div>
                <div className="image">
                  <img src={img7} alt="Gallery Image 7" />
                </div>
                <div className="image">
                  <img src={img8} alt="Gallery Image 8" />
                </div>
                <div className="image">
                  <img src={img9} alt="Gallery Image 9" />
                </div>
                <div className="image">
                  <img src={img10} alt="Gallery Image 10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
