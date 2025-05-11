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
                        animateOnce={ true }
                    >
                        <div className="about-image-gallery">
                            <img className="image-1 w-100" src="https://file1.hutech.edu.vn/file/editor/homepage1/_N7A1441.jpg" alt="About Thumb" />
                            <div className="badge-icon">
                                {/* <div className="badge-inner">
                                    <img src="/images/about/about-08/badge.png" alt="Icon Thumb" />
                                </div> */}
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div className="col-xl-6 col-lg-6 offset-xl-1">
                        <div className="inner mt_md--40 mt_sm--20">
                            <SectionTitle
                                slogan = "Giới thiệu về chúng tôi"
                                title = "Tạo ra một cộng đồng những người học tập suốt đời "
                            />
                            <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                animateOnce={ true }
                            >
                                <p className="description line-before mt--40 mb--40">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.</p>
                            </ScrollAnimation>
                            <div className="feature-list-wrapper">
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={ true }><i className="icon-checkbox-circle-fill"></i>Chương trình đào tạo linh hoạt</ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={ true }><i className="icon-checkbox-circle-fill"></i>Môi trường thân thiện dành cho bạn</ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={ true }><i className="icon-checkbox-circle-fill"></i>Học hỏi từ các chuyên gia được công nhận</ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" className="feature-list" animateOnce={ true }><i className="icon-checkbox-circle-fill"></i>Tăng cường kiến ​thức của bạn</ScrollAnimation>
                            </div>
                            <div className="read-more-btn mt--75 mt_lg--30 mt_md--40 mt_sm--40">
                                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" animateOnce={ true }>
                                    <Link className="edu-btn" to="/about-us-1">biết về chúng tôi<i className="icon-arrow-right-line-right"></i></Link>
                                    <a className="info-btn" href="tel: 84+ 356528378"><i className="icon-call"></i>84+ 356528378</a>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-05-04.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-33.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-13-05.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <img src="/images/shapes/shape-01-03.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-5">
                        <img src="/images/shapes/shape-06.png" alt="Shape Thumb" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutEight;