import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import PortfolioLayer from "../components/PortfolioLayer";

const PortfolioPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Portfolio" />

        {/* PortfolioLayer */}
        <PortfolioLayer />

      </MasterLayout>

    </>
  );
};

export default PortfolioPage; 
