import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import CurrenciesLayer from "../components/CurrenciesLayer";


const CurrenciesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Currencies" />

        {/* CurrenciesLayer */}
        <CurrenciesLayer />


      </MasterLayout>
    </>
  );
};

export default CurrenciesPage;
