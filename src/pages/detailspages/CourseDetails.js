import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import HeaderTwo from '../../common/header/HeaderTwo';
import Footer from '../../common/footer/FooterTwo';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import 'bootstrap/dist/css/bootstrap.min.css';

const IMAGE_BASE_URL = 'http://localhost:8080';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [openLessonId, setOpenLessonId] = useState(null);
  const lessonRefs = useRef([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error('Error fetching course:', err));

    fetch(`http://localhost:8080/api/lessons/course/${id}`)
      .then(res => res.json())
      .then(data => {
        const sortedLessons = Array.isArray(data)
          ? [...data].sort((a, b) => {
              const numA = parseInt(a.name?.match(/\d+/)?.[0]) || 0;
              const numB = parseInt(b.name?.match(/\d+/)?.[0]) || 0;
              return numA - numB;
            })
          : [];
        setLessons(sortedLessons);
      })
      .catch(err => {
        console.error('Error fetching lessons:', err);
        setLessons([]);
      });
  }, [id]);

  const totalLessons = lessons.length;

  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return '';
    }
  };

  const getFullImageUrl = (imgPath) => {
    if (!imgPath) return '';
    return imgPath.startsWith('http') ? imgPath : `${IMAGE_BASE_URL}${imgPath}`;
  };

  const handleRegister = () => {
    setRegistered(true);
    setShowToast(true);
    setShowAlert(true);

    setTimeout(() => {
      setShowToast(false);
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <HeaderTwo />
      <BreadcrumbOne
        title={course?.title || course?.name || 'Course Details'}
        rootUrl="/"
        parentUrl="Home"
        currentUrl="Course Details"
      />

      {showToast && (
        <div
          className="toast show position-fixed top-0 end-0 m-4 bg-success text-white shadow"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body">🎉 You have successfully registered for the course!</div>
        </div>
      )}

      <div className="edu-course-details-area edu-section-gap bg-color-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-7">
              <div className="course-details-content">
                <h1 className="fw-bold display-4 mb-3 text-dark text-uppercase">
                  {course?.title || course?.name || 'Course Title'}
                </h1>

                <p className="mb-4 text-muted fs-4">{course?.description}</p>

                <h4 className="mb-3 fs-3">📘 Course Content</h4>

                {!registered ? (
                  <div className="alert alert-warning fs-5">
                    🔒 Please <strong>register for the course</strong> to view lesson content.
                  </div>
                ) : (
                  <>
                    <p className="text-muted fs-5">
                      Total of <strong>{totalLessons}</strong> lessons
                    </p>
                    <div className="accordion" id="lessonAccordion">
                      {lessons.map((lesson, idx) => {
                        const isOpen = openLessonId === lesson.id;

                        return (
                          <div
                            className="accordion-item"
                            key={lesson.id}
                            ref={el => lessonRefs.current[idx] = el}
                          >
                            <h2 className="accordion-header" id={`heading${lesson.id}`}>
                              <button
                                className={`accordion-button ${isOpen ? '' : 'collapsed'} fs-5 fw-semibold`}
                                type="button"
                                onClick={() => {
                                  setOpenLessonId(isOpen ? null : lesson.id);
                                  setTimeout(() => {
                                    lessonRefs.current[idx]?.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start'
                                    });
                                  }, 300);
                                }}
                                aria-expanded={isOpen ? 'true' : 'false'}
                                aria-controls={`collapse${lesson.id}`}
                              >
                                {lesson.name || 'Untitled Lesson'}
                              </button>
                            </h2>
                            <div
                              id={`collapse${lesson.id}`}
                              className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                              aria-labelledby={`heading${lesson.id}`}
                            >
                              <div className="accordion-body fs-6">
                                <p><strong>Lesson Name:</strong> {lesson.name}</p>
                                <p><strong>Description:</strong> {lesson.description || 'No description available.'}</p>
                                <p><strong>Date:</strong> {lesson.lessonDate ? new Date(lesson.lessonDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : 'No date available'}</p>

                                {lesson.referenceLink && (
                                  <div className="ratio ratio-16x9 mt-3">
                                    <iframe
                                      src={getEmbedUrl(lesson.referenceLink)}
                                      title={`Video for ${lesson.name}`}
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="card shadow-sm border-0">
                {course?.introVideo ? (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={getEmbedUrl(course.introVideo)}
                      title="Intro video"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={course?.imageUrl ? getFullImageUrl(course.imageUrl) : 'https://via.placeholder.com/400x200?text=Course+Image'}
                    alt="Course thumbnail"
                    className="card-img-top"
                  />
                )}
                <div className="card-body text-center">
                  <ul className="list-group list-group-flush text-start fs-5 mb-3">
                    <li className="list-group-item"><strong>🧠 Level:</strong> {course?.level || 'Beginner'}</li>
                    <li className="list-group-item"><strong>🎓 Lessons:</strong> {totalLessons}</li>
                    <li className="list-group-item"><strong>⏱️ Duration:</strong> {course?.duration || 'Updating'}</li>
                    <li className="list-group-item">📅 Learn anytime, anywhere</li>
                  </ul>

                  {!registered && (
                    <>
                      <h4 className="text-danger fw-bold mb-3 fs-3">🎁 Free</h4>
                      <button className="btn btn-primary w-100 fs-5" onClick={handleRegister}>
                        REGISTER NOW
                      </button>
                    </>
                  )}

                  {showAlert && (
                    <div className="alert alert-success mt-3 fs-6">
                      ✅ You have successfully registered!
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;
