import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageUserTable from './ManageUserTable';
import ManageUserDialog from './ManageUserDialog';
import { getAllUser } from './ManageUserServices';

const ManageUser = () => {

    const [item, setItem] = useState(null);
    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (value) => {
        setOpen(true);
        setItem(value);
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
                <ManageUserTable data={listitem} handleEdit={handleEdit} />
            </Card>
            {open && <ManageUserDialog
                open={open}
                item={item}
                handleClose={handleClose}
            />}
        </PageContainer>
    );
};

export default ManageUser;
