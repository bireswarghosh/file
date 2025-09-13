import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import UsersGridLayer from "../components/UsersGridLayer";


const UsersGridPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Users Grid" />

        {/* UsersGridLayer */}
        <UsersGridLayer />

      </MasterLayout>

    </>
  );
};

export default UsersGridPage; 
