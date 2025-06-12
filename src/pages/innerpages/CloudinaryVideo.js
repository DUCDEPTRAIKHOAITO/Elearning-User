import React from 'react';

const CloudinaryVideo = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Video từ Cloudinary</h2>
      <video controls width="720">
        <source
          src="https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/sample.mp4"
          type="video/mp4"
        />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  );
};

export default CloudinaryVideo;
