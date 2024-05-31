import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ManageOrdersDialog from './ManageOrdersDialog';
import { getListOrders } from './ManageOrdersServices';
import ManageOrdersTable from './ManageOrdersTable';

const ManageOrders = () => {
  const [listitem, setListItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const getOrders = async () => {
    try {
      const data = await getListOrders();
      if (data?.status === 200) {
        setListItem(data?.data.reverse());
      }
    } catch (error) {}
  };

  const handleView = (value) => {
    setOpen(true);
    setItem(value);
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <PageContainer title="Orders">
      <Card sx={{ p: 1, minHeight: 'screen' }}>
        <ManageOrdersTable data={listitem} handleView={handleView} />
      </Card>
      {open && (
        <ManageOrdersDialog
          open={open}
          handleClose={handleClose}
          item={item}
          getOrders={getOrders}
        />
      )}
    </PageContainer>
  );
};

export default ManageOrders;
