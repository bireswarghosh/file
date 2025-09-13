import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import TableDataLayer from "../components/TableDataLayer";

const TableDataPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Visitors List" />

        {/* TableDataLayer */}
        <TableDataLayer />

      </MasterLayout>

    </>
  );
};

export default TableDataPage; 
