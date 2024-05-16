import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageBookBorrowTable from './ManageBookBorrowTable';
import ManageBookBorrowDialog from './ManageBookBorrowDialog';
import { trasach, listMuonSach } from './ManageBookBorrowServices';
import { toast } from 'react-toastify';
import ConfirmDialogCustom from '../components/ConfirmDialogCustom';

const ManageBookBorrow = () => {

    const [item, setItem] = useState(null);
    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setItem(null);
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

    const handleYesConfirm = async () => {
        try {
            let formData = new FormData();
            formData.append("BookID", item?.book?.book_id);
            formData.append("code", item?.libraryCard?.code);
            await trasach(formData);
            toast.success("Trả sách thành công")
        } catch (error) {

        } finally {
            setOpenDelete(false);
            search();
        }
    }

    const search = async () => {
        try {
            const data = await listMuonSach();
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
        <PageContainer title="Quản lý loại sách">
            <Card sx={{ p: 1, minHeight: "screen" }}>
                <Button variant='contained' size='small' onClick={handleClickOpen}>Thêm mới</Button>
                <ManageBookBorrowTable data={listitem} handleEdit={handleEdit} handleOpenDelete={handleOpenDelete} />
            </Card>
            {open && <ManageBookBorrowDialog
                open={open}
                item={item}
                search={search}
                handleClose={handleClose}
            />}
            {openDelete && <ConfirmDialogCustom
                title="Xác nhận trả lại sách"
                content="Bạn có muốn xác nhận trả lại sách"
                open={openDelete}
                handleClose={handleClose}
                handleYesDelete={handleYesConfirm}
            />}
        </PageContainer>
    );
};

export default ManageBookBorrow;
