import React from 'react';
import { Link } from 'react-router-dom';
import './SearchCourseDropdown.css';

const SearchCourseDropdown = ({ keyword, courses }) => {
    if (!keyword || courses.length === 0) return null;

    return (
        <div className="search-course-dropdown">
            <div className="dropdown-header">Results for "{keyword}"</div>
            <ul className="dropdown-list">
                {courses.slice(0, 5).map(course => (
                    <li key={course.id} className="dropdown-item">
                        <Link to={`/course-details/${course.id}`} className="dropdown-link">
                            <img
                                src={course.imageUrl || '/images/course/default.jpg'}
                                alt={course.name}
                                className="dropdown-img"
                            />
                            <span className="dropdown-title">{course.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCourseDropdown;
