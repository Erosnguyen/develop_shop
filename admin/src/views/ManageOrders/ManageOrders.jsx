import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ManageOrdersTable from './ManageOrdersTable';
import { getListOrders } from './ManageOrdersServices';

const ManageOrders = () => {

    const [listitem, setListItem] = useState([]);

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
                <ManageOrdersTable data={listitem} />
            </Card>
        </PageContainer>
    );
};

export default ManageOrders;
