import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import CarouselLayer from "../components/CarouselLayer";


const ChatEmptyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Chat Empty" />

        {/* CarouselLayer */}
        <CarouselLayer />


      </MasterLayout>
    </>
  );
};

export default ChatEmptyPage;
