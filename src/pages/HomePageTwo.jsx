import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import DashBoardLayerTwo from "../components/DashBoardLayerTwo";


const HomePageTwo = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="CRM" />

        {/* DashBoardLayerTwo */}
        <DashBoardLayerTwo />

      </MasterLayout>
    </>
  );
};

export default HomePageTwo;
