import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageOrdersTable from './ManageOrdersTable';
import { getListOrders } from './ManageOrdersServices';
import ManageOrdersDialog from './ManageOrdersDialog';

const ManageOrders = () => {

    const [listitem, setListItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null)

    const search = async () => {
        try {
            const data = await getListOrders();
            if (data?.status === 200) {
                setListItem(data?.data)
            }
        } catch (error) {

        }
    }

    const handleView = (value) => {
        setOpen(true);
        setItem(value);
    }

    const handleClose = () => {
        setOpen(false);
        setItem(null);
    }

    useEffect(() => {
        search();
    }, []);

    console.log(listitem)
    return (
        <PageContainer title="Orders">
            <Card sx={{ p: 1, minHeight: "screen" }}>
                <ManageOrdersTable data={listitem} handleView={handleView} />
            </Card>
            {
                open && <ManageOrdersDialog open={open} handleClose={handleClose} item={item} search={search}/>
            }
        </PageContainer>
    );
};

export default ManageOrders;
