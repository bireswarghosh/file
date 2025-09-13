import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import CarouselLayer from "../components/CarouselLayer";


const CarouselPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Carousel" />

        {/* CarouselLayer */}
        <CarouselLayer />


      </MasterLayout>
    </>
  );
};

export default CarouselPage;
