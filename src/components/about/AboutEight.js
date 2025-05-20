import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';

const AboutEight = () => {
    return (
        <div className="eduvibe-home-five-about edu-about-area about-style-6 edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row g-5 align-items-center">
                    <ScrollAnimation 
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className="col-xl-5 col-lg-6"
                        animateOnce={true}
                    >
                        <div className="about-image-gallery">
                            <img
                                className="image-1 w-100"
                                src="https://file1.hutech.edu.vn/file/editor/homepage1/_N7A1441.jpg"
                                alt="About Thumb"
                            />
                        </div>
                    </ScrollAnimation>

                    <div className="col-xl-6 col-lg-6 offset-xl-1">
                        <div className="inner mt_md--40 mt_sm--20">
                            <SectionTitle
                                slogan="About Us"
                                title="Building a Community of Lifelong Learners"
                            />

                            <ScrollAnimation
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                animateOnce={true}
                            >
                                <p className="description line-before mt--40 mb--40">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Suspendisse varius enim in eros elementum tristique. Duis cursus,
                                    mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
                                    libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
                                    lorem imperdiet.
                                </p>
                            </ScrollAnimation>

                            <div className="feature-list-wrapper">
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={true}>
                                    <i className="icon-checkbox-circle-fill"></i>Flexible learning programs
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={true}>
                                    <i className="icon-checkbox-circle-fill"></i>Friendly and supportive environment
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={true}>
                                    <i className="icon-checkbox-circle-fill"></i>Learn from recognized experts
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={true}>
                                    <i className="icon-checkbox-circle-fill"></i>Boost your knowledge and skills
                                </ScrollAnimation>
                            </div>

                            <div className="read-more-btn mt--75 mt_lg--30 mt_md--40 mt_sm--40">
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" animateOnce={true}>
                                    <Link className="edu-btn" to="/about-us-1">
                                        Learn More<i className="icon-arrow-right-line-right"></i>
                                    </Link>
                                    <a className="info-btn" href="tel:+84356528378">
                                        <i className="icon-call"></i> +84 356 528 378
                                    </a>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-05-04.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-33.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-13-05.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <img src="/images/shapes/shape-01-03.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-5">
                        <img src="/images/shapes/shape-06.png" alt="Shape" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutEight;
