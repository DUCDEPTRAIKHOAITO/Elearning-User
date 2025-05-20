import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Link } from 'react-router-dom';

const BannerFive = (props) => {
    const [toggler, setToggler] = useState(false);
    const videoLink = [
        props.videoLink || 'https://www.youtube.com/watch?v=y40hcCpbays&t=8017s'
    ];

    return (
        <>
            <div className="slider-area banner-style-5 bg-image">
                <div className="wrapper d-flex align-items-center">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <div className="inner pt--100 pt_md--0 pt_sm--0">
                                    <div className="content text-start">
                                        <h1 className="title">Welcome to My Courses!</h1>
                                        <p className="description">These are high-quality courses meeting international standards.</p>
                                        <div className="read-more-btn">
                                            <Link className="edu-btn" to="/course-5" target="_blank">Get Started <i className="icon-arrow-right-line-right"></i></Link>
                                            <div className="video-btn-wrapper" onClick={() => setToggler(!toggler)}>
                                                <button
                                                    onClick={() => setToggler(!toggler)}
                                                    className="video-play-btn with-animation video-popup-activation"
                                                >
                                                    <span className="play-icon"></span>
                                                </button>
                                                <span className="video-text">Watch Video</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="banner-image">
                                    <div className="thumbnail">
                                        <img src="https://dongphuchaianh.com/wp-content/uploads/2022/03/tao-dang-tu-nhien-ao-cu-nhan.jpg" alt="Banner" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-07.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-03-05.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-05-04.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <img src="/images/shapes/shape-06.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-5">
                        <img src="/images/shapes/shape-01-03.png" alt="Shape" />
                    </div>
                    <div className="shape-image shape-image-6">
                        <img src="/images/shapes/shape-01-04.png" alt="Shape" />
                    </div>
                </div>
            </div>
            <FsLightbox toggler={toggler} sources={videoLink} />
        </>
    );
};

export default BannerFive;
