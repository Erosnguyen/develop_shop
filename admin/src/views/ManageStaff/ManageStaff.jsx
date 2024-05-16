import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageStaffTable from './ManageStaffTable';
import ManageStaffDialog from './ManageStaffDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteStaff, getAlllStaff } from './ManageStaffServices';
import { toast } from 'react-toastify';

const ManageStaff = () => {
    const [item, setItem] = useState(null);
    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = () => {
        setItem(null)
        setOpen(true);
    };

    const handleClose = () => {
        setItem(null)
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
            await deleteStaff(item?.staff_id);
            toast.success("Xóa thành công")
        } catch (error) {

        } finally {
            handleClose();
            search();
        }
    }

    const search = async () => {
        try {
            const data = await getAlllStaff();
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
        <PageContainer title="Quản lý nhân viên">
            <Card sx={{ p: 1, minHeight: "screen" }}>
                <Button variant='contained' size='small' onClick={handleClickOpen}>Thêm mới</Button>
                <ManageStaffTable data={listitem} handleEdit={handleEdit} handleOpenDelete={handleOpenDelete} />
            </Card>
            {open && <ManageStaffDialog
                open={open}
                item={item}
                search={search}
                handleClose={handleClose}
            />}
            {openDelete && <ConfirmDialog
                open={openDelete}
                handleClose={handleClose}
                handleYesDelete={handleYesDelete}
            />}
        </PageContainer>
    );
};

export default ManageStaff;
