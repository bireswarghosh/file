import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import TypographyLayer from "../components/TypographyLayer";


const TypographyPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Typography" />

        {/* TypographyLayer */}
        <TypographyLayer />

      </MasterLayout>

    </>
  );
};

export default TypographyPage; 
