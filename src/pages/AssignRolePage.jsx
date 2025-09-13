import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import AssignRoleLayer from "../components/AssignRoleLayer";


const AssignRolePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Assign Role" />

        {/* AssignRoleLayer */}
        <AssignRoleLayer />


      </MasterLayout>
    </>
  );
};

export default AssignRolePage;
