import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import FaqLayer from "../components/FaqLayer";


const FaqPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Faq" />

        {/* FaqLayer */}
        <FaqLayer />


      </MasterLayout>
    </>
  );
};

export default FaqPage;
