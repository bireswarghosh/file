import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import ListLayer from "../components/ListLayer";




const ListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / List" />

        {/* ListLayer */}
        <ListLayer />

      </MasterLayout>

    </>
  );
};

export default ListPage; 
