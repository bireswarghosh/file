import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import BlogDetailsLayer from "../components/BlogDetailsLayer";

const BlogDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Blog Details' />

        {/* BlogDetailsLayer */}
        <BlogDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default BlogDetailsPage;
