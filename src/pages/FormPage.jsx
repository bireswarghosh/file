import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import FormPageLayer from "../components/FormPageLayer";



const FormPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Input Form" />

        {/* FormPageLayer */}
        <FormPageLayer />

      </MasterLayout>

    </>
  );
};

export default FormPage;
