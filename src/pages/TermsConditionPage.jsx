import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import TermsConditionLayer from "../components/TermsConditionLayer";

const TermsConditionPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Terms & Conditions" />

        {/* TermsConditionLayer */}
        <TermsConditionLayer />

      </MasterLayout>

    </>
  );
};

export default TermsConditionPage; 
