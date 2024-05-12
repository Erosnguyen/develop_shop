import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageGenreTable from './ManageGenreTable';
import ManageGenreDialog from './ManageGenreDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteGenre, getListOrders } from './ManageGenreServices';
import { toast } from 'react-toastify';

const ManageGenre = () => {

    const [item, setItem] = useState(null);
    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = () => {
        setItem(null);
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

    const handleYesDelete = async () => {
        try {
            await deleteGenre(item?.genre_id);
            toast.success("Xóa thành công")
        } catch (error) {

        } finally {
            setOpenDelete(false);
            search();
        }
    }

    const search = async () => {
        try {
            const data = await getListOrders();
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
        <PageContainer title="Orders">
            <Card sx={{ p: 1, minHeight: "screen" }}>
                <ManageGenreTable data={listitem} handleEdit={handleEdit} handleOpenDelete={handleOpenDelete} />
            </Card>
            {open && <ManageGenreDialog
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

export default ManageGenre;
