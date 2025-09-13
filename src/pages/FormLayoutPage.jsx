import React from "react";
import FormLayoutLayer from "../components/FormLayoutLayer";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";


const FormLayoutPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Input Layout" />

        {/* FormLayoutLayer */}
        <FormLayoutLayer />

      </MasterLayout>

    </>
  );
};

export default FormLayoutPage;
