import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import VideoGeneratorLayer from "../components/VideoGeneratorLayer";


const VideoGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Video Generator" />

        {/* VideoGeneratorLayer */}
        <VideoGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default VideoGeneratorPage; 
