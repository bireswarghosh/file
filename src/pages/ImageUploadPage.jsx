import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import ImageUploadLayer from "../components/ImageUploadLayer";




const ImageUploadPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Image Upload" />

        {/* ImageUploadLayer */}
        <ImageUploadLayer />

      </MasterLayout>

    </>
  );
};

export default ImageUploadPage;
