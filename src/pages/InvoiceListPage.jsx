import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import InvoiceListLayer from "../components/InvoiceListLayer";




const InvoiceListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Invoice - List" />

        {/* InvoiceListLayer */}
        <InvoiceListLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceListPage;
