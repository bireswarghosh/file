import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import ChatMessageLayer from "../components/ChatMessageLayer";


const ChatMessagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Chat Message" />

        {/* ChatMessageLayer */}
        <ChatMessageLayer />


      </MasterLayout>
    </>
  );
};

export default ChatMessagePage;
