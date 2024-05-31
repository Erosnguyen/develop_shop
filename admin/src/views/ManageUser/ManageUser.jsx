import React, { useEffect, useState } from 'react';
import { Card, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageUserTable from './ManageUserTable';
import ManageUserDialog from './ManageUserDialog';
import { deleteUser, getAllUser } from './ManageUserServices';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageUser = () => {

    const [item, setItem] = useState(null);
    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
    };

    const handleEdit = (value) => {
        setOpen(true);
        setItem(value);
    }

    const handleOpenDelete = (value) => {
        setOpenDelete(true);
        setItem(value);
    }

    const handleYesDelete = async () => {
        try {
            await deleteUser(item?.user?.user_id);
            toast.success("Xóa thành công")
        } catch (error) {
            toast.error("Xóa thất bại")
        } finally {
            handleClose();
            search();
        }
    }

    const search = async () => {
        try {
            const data = await getAllUser();
            if (data?.status === 200) {
                setListItem(data?.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <PageContainer title="Quản lý người dùng">
            <Card sx={{ p: 1, minHeight: "screen" }}>
                <ManageUserTable data={listitem} handleEdit={handleEdit} handleOpenDelete={handleOpenDelete} />
            </Card>
            {open && <ManageUserDialog
                open={open}
                item={item}
                handleClose={handleClose}
            />}
            {openDelete && 
            <ConfirmDialog
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                handleYesDelete={handleYesDelete}
            />}

        </PageContainer>
    );
};

export default ManageUser;
