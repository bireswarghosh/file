import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import ProgressLayer from "../components/ProgressLayer";

const ProgressPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Progress Bar" />

        {/* ProgressLayer */}
        <ProgressLayer />

      </MasterLayout>

    </>
  );
};

export default ProgressPage; 
