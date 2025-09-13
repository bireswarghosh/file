import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import NotificationLayer from "../components/NotificationLayer";



const NotificationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Notification" />

        {/* NotificationLayer */}
        <NotificationLayer />

      </MasterLayout>

    </>
  );
};

export default NotificationPage; 
