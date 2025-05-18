import React from 'react';
import { Link } from 'react-router-dom';

const CourseTwo = ({ data, classes }) => {
    if (!data) return null;

    const price = Number(data.price || 0);
    const oldPrice = Number(data.oldPrice || 0);
    const isOffer = data.oldPrice && price < oldPrice;
    const offerInPercentage = oldPrice ? Math.round(100 * (oldPrice - price) / oldPrice) : 0;
    return (
        <div className={`edu-card card-type-5 radius-small ${classes || ''}`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
                        <img
                            className="w-100"
                            src={data.imageUrl || '/images/course/default.jpg'}
                            alt="Course Thumb"
                        />
                    </Link>

                    <div className="top-position status-group left-top">
                        {/* { isOffer && <span className="eduvibe-status status-01 bg-secondary-color">{offerInPercentage}% Off</span> } */}
                        {/* <span className="eduvibe-status status-01 bg-primary-color">{data.level}</span> */}
                    </div>
                    
                    {/* <div className="wishlist-top-right">
                        <button className="wishlist-btn"><i className="icon-Heart"></i></button>
                    </div> */}
                </div>
                
                 <div className="content">
                    
                    {/* <div className="price-list price-style-03">
                        <div className="price current-price">{price === 0 ? 'Free' : `$${price}`}</div>
                        {oldPrice && <div className="price old-price">${oldPrice}</div>}
                    </div> */}
                   <h6 className="title">{data.name}</h6>
                   <Link to={`/course-details/${data.id}`}>
                            {data.name}
                        </Link>
                    {/* <ul className="edu-meta meta-01">
                        <li><i className="icon-time-line"></i>{data.duration}</li>
                        <li><i className="icon-group-line"></i>{data.student} Students</li>
                    </ul> */}
                    <div className="card-bottom">
                        <div className="read-more-btn">
                            <Link className="btn-transparent" to={`/course-details/${data.id}`}>
                                Enroll Now<i className="icon-arrow-right-line-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseTwo;