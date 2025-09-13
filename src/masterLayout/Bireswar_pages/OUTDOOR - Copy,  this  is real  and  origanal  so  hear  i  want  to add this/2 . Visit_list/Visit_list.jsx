import * as React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import DataTable from '../DataTable/DataTable';

const Visit_list = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Visit List" />
      <DataTable />
    </MasterLayout>
  );
};

export default Visit_list;

