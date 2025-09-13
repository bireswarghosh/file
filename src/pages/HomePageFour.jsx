import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import DashBoardLayerFour from "../components/DashBoardLayerFour";


const HomePageFour = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Cryptocracy" />


        {/* DashBoardLayerFour */}
        <DashBoardLayerFour />


      </MasterLayout>
    </>
  );
};

export default HomePageFour;
