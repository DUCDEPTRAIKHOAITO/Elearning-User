import React, { useEffect, useState } from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import CourseTypeFive from '../../components/course/CourseTypeFive';
import axios from 'axios';

const CourseFive = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;

    useEffect(() => {
        axios.get('http://localhost:8080/api/courses')
            .then(response => {
                const updatedCourses = response.data.map(course => ({
                    ...course,
                    imageUrl: course.imageUrl || (course.image ? `http://localhost:8080/uploads/${course.image}` : '/images/course/default.jpg')
                }));
                setCourses(updatedCourses);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    // Phân trang
    const indexOfLast = currentPage * coursesPerPage;
    const indexOfFirst = indexOfLast - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <SEO title="Course Style - 5" />
            <Layout>
                <BreadcrumbOne 
                    title="Course Style"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Course Style"
                />
                <div className="edu-course-area edu-section-gap bg-color-white">
                    <div className="container">
                        <div className="row g-5 mt--10">
                            {currentCourses.map(course => (
                                <div className="col-12 col-sm-6 col-lg-4" key={course.id}>
                                    <CourseTypeFive data={course} />
                                </div>
                            ))}
                        </div>

                        {/* Nút phân trang */}
                        <div className="d-flex justify-content-center mt-5">
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                        >
                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CourseFive;
