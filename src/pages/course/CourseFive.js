import React, { useEffect, useState } from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import CourseTypeFive from '../../components/course/CourseTypeFive';
import axios from 'axios';

const CourseFive = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
        .then(response => {
            const updatedCourses = response.data.map(course => ({
                ...course,
                // ⚠️ Ưu tiên dùng imageUrl nếu có, nếu không thì sinh từ image
                imageUrl: course.imageUrl 
                    || (course.image ? `http://localhost:8080/uploads/${course.image}` 
                                     : '/images/course/default.jpg')
            }));
            setCourses(updatedCourses);
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
}, []);

    return (
        <>
            <SEO title="Course Style - 5" />
            <Layout>
                <BreadcrumbOne 
                    title="Course Style "
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Course Style "
                />
                <div className="edu-course-area edu-section-gap bg-color-white">
                    <div className="container">
                        <div className="row g-5 mt--10">
                            {courses.map(course => (
                                <div className="col-12 col-sm-6 col-lg-4" key={course.id}>
                                    <CourseTypeFive data={course} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CourseFive;
