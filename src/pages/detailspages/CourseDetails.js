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
      .then(data => setLessons(Array.isArray(data) ? data : []))
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
        title={course?.title || course?.name || 'Chi tiết khóa học'}
        rootUrl="/"
        parentUrl="Home"
        currentUrl="Course Details"
      />

      {/* Toast message - disappears after 3s */}
      {showToast && (
        <div
          className="toast show position-fixed top-0 end-0 m-4 bg-success text-white shadow"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body">🎉 Bạn đã đăng ký khóa học thành công!</div>
        </div>
      )}

      <div className="edu-course-details-area edu-section-gap bg-color-white py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-7">
              <div className="course-details-content">
                <h1 className="fw-bold display-4 mb-3 text-dark text-uppercase">
                  {course?.title || course?.name || 'Tên khóa học'}
                </h1>

                <p className="mb-4 text-muted fs-4">{course?.description}</p>

                <h4 className="mb-3 fs-3">📘 Nội dung khóa học</h4>

                {!registered ? (
                  <div className="alert alert-warning fs-5">
                    🔒 Bạn cần <strong>đăng ký khóa học</strong> để xem nội dung bài học.
                  </div>
                ) : (
                  <>
                    <p className="text-muted fs-5">
                      Tổng cộng <strong>{totalLessons}</strong> bài học
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
                                {lesson.name || 'Bài học không tên'}
                              </button>
                            </h2>
                            <div
                              id={`collapse${lesson.id}`}
                              className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                              aria-labelledby={`heading${lesson.id}`}
                            >
                              <div className="accordion-body fs-6">
                                <p><strong>Tên bài học:</strong> {lesson.name}</p>
                                <p><strong>Mô tả:</strong> {lesson.description || 'Chưa có mô tả.'}</p>
                                <p><strong>Ngày học:</strong> {lesson.lessonDate ? new Date(lesson.lessonDate).toLocaleDateString('en-US', {
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

            {/* Sidebar */}
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
                    <li className="list-group-item"><strong>🧠 Trình độ:</strong> {course?.level || 'Cơ bản'}</li>
                    <li className="list-group-item"><strong>🎓 Bài học:</strong> {totalLessons} bài</li>
                    <li className="list-group-item"><strong>⏱️ Thời lượng:</strong> {course?.duration || 'Đang cập nhật'}</li>
                    <li className="list-group-item">📅 Học mọi lúc mọi nơi</li>
                  </ul>

                  {/* Miễn phí chỉ hiển thị khi chưa đăng ký */}
                  {!registered && (
                    <h4 className="text-danger fw-bold mb-3 fs-3">🎁 Miễn phí</h4>
                  )}

                  {/* Nút đăng ký hiển thị khi chưa đăng ký */}
                  {!registered && (
                    <button className="btn btn-primary w-100 fs-5" onClick={handleRegister}>
                      ĐĂNG KÝ HỌC
                    </button>
                  )}

                  {/* Alert thành công (tự ẩn sau 3s) */}
                  {showAlert && (
                    <div className="alert alert-success mt-3 fs-6">
                      ✅ Bạn đã đăng ký thành công!
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
