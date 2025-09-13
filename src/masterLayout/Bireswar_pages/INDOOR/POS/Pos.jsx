import React, { useState } from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const POS = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="POS - Upload Preview" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="mb-0">
              {filename ? (
                <i className="bi bi-image-fill me-2"></i>
              ) : (
                <i className="bi bi-upload me-2"></i>
              )}
              {filename || 'Upload Image File'}
            </h5>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
              />
            </div>
          </div>

          <div className="card-body p-4 bg-light">
            {imageSrc ? (
              <div className="image-wrapper text-center">
                <img
                  src={imageSrc}
                  alt={filename}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <i className="bi bi-file-image fs-1 mb-3"></i>
                <p className="lead">No image uploaded yet. Please upload an image to preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default POS;

/*
📎 ADD TO GLOBAL CSS OR A LINKED FILE:

.card.shadow-xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1) !important;
}
.rounded-4 {
  border-radius: 1rem !important;
}
.image-wrapper img {
  transition: all 0.3s ease-in-out;
}
.image-wrapper img:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
}
.card-header input[type="file"] {
  max-width: 300px;
}
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
*/
