import React from "react";
import MasterLayout from "../../../MasterLayout";
// "../masterLayout/MasterLayout";
import Breadcrumb from "../../../Breadcrumb";
import New from "./New";
// "../components/Breadcrumb";
// import FormValidationLayer from "../../../../components/FormValidationLayer";
// "../components/FormValidationLayer";


const FormValidationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Visit Entry" />


        <New />

        {/* FormValidationLayer */}
        {/* <FormValidationLayer /> */}

      </MasterLayout>

    </>
  );
};

export default FormValidationPage;
