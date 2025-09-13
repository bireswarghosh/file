import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import TextGeneratorNewLayer from "../components/TextGeneratorNewLayer";

const TextGeneratorNewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Text Generator" />

        {/* TextGeneratorNewLayer */}
        <TextGeneratorNewLayer />

      </MasterLayout>

    </>
  );
};

export default TextGeneratorNewPage; 
