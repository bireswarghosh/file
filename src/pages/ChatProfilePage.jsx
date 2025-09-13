import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import ChatProfileLayer from "../components/ChatProfileLayer";


const ChatProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Chat" />

        {/* ChatProfileLayer */}
        <ChatProfileLayer />


      </MasterLayout>
    </>
  );
};

export default ChatProfilePage;
