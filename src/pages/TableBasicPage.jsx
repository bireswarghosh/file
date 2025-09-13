import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import TableBasicLayer from "../components/TableBasicLayer";

const TableBasicPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Basic Table" />

        {/* TableBasicLayer */}
        <TableBasicLayer />

      </MasterLayout>

    </>
  );
};

export default TableBasicPage; 
