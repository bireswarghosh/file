import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import VideosLayer from "../components/VideosLayer";


const VideosPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Videos" />

        {/* VideosLayer */}
        <VideosLayer />

      </MasterLayout>

    </>
  );
};

export default VideosPage; 
