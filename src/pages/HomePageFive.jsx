import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import DashBoardLayerFive from "../components/DashBoardLayerFive";


const HomePageFive = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Investment" />

        {/* DashBoardLayerFive */}
        <DashBoardLayerFive />



      </MasterLayout>
    </>
  );
};

export default HomePageFive;
