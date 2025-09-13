import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import DashBoardLayerEight from "../components/DashBoardLayerEight";

const HomePageEight = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Medical' />

        {/* DashBoardLayerEight */}
        <DashBoardLayerEight />
      </MasterLayout>
    </>
  );
};

export default HomePageEight;
