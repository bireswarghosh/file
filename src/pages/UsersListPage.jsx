import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import UsersListLayer from "../components/UsersListLayer";


const UsersListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Users Grid" />

        {/* UsersListLayer */}
        <UsersListLayer />

      </MasterLayout>

    </>
  );
};

export default UsersListPage; 
