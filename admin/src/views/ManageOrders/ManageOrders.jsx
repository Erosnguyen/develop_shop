import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageOrdersTable from './ManageOrdersTable';
import { deleteOrder, getListOrders } from './ManageOrdersServices';
import ManageOrdersDialog from './ManageOrdersDialog';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageOrders = () => {
  const [listitem, setListItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const search = async () => {
    try {
      const data = await getListOrders();
      if (data?.status === 200) {
        setListItem(data?.data);
      }
    } catch (error) {}
  };

  const handleView = (value) => {
    setOpen(true);
    setItem(value);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setItem(null);
  };

  useEffect(() => {
    search();
  }, []);

  const handleOpenDelete = (value) => {
    setOpenDelete(true);
    setItem(value);
  };

  const handleYesDelete = async () => {
    try {
      await deleteOrder(item?.order_id);
      toast.success('Xóa thành công');
      search();
    } catch (error) {
    } finally {
      handleClose();
      search();
    }
  };

  console.log(listitem);
  return (
    <PageContainer title="Orders">
      <Card sx={{ p: 1, minHeight: 'screen' }}>
        <ManageOrdersTable data={listitem} handleView={handleView} handleOpenDelete={handleOpenDelete} />
      </Card>
      {open && (
        <ManageOrdersDialog
          open={open}
          handleClose={handleClose}
          item={item}
          search={search}
          
        />
      )}
      {openDelete && (
        <ConfirmDialog
          open={openDelete}
          handleClose={handleClose}
          handleYesDelete={handleYesDelete}
        />
      )}
    </PageContainer>
  );
};

export default ManageOrders;
