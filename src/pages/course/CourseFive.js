import React, { useEffect, useState } from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import CourseTypeFive from '../../components/course/CourseTypeFive'
import CourseData from '../../data/course/CourseData.json';
import axios from 'axios';

const CourseFive = () => {
    const [courses, setCourses] = useState([]);

     useEffect(() => {
        axios.get('http://localhost:8080/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
  }, []);

  console.log(courses);


    return (
        <>
            <SEO title="Course Style - 5" />
            <Layout>
                <BreadcrumbOne 
                    title="Course Style - 5"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Course Style - 5"
                />
                <div className="edu-course-area edu-section-gap bg-color-white">
                    <div className="container">
                        <div className="row g-5 mt--10">
                            { 
                                courses.map((data) => (
                                    <div className="col-12 col-sm-6 col-lg-4" key={ data.id }>
                                        <CourseTypeFive data={data} />
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CourseFive;