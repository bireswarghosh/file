import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import MarketplaceLayer from "../components/MarketplaceLayer";



const MarketplacePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Marketplace" />

        {/* MarketplaceLayer */}
        <MarketplaceLayer />

      </MasterLayout>

    </>
  );
};

export default MarketplacePage; 
