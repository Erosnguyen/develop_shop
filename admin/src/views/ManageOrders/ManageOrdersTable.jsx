import React from 'react'
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Card,
    Button,
    Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomerName from './CustomerName';

function ManageOrdersTable(props) {
    let {
        data,
        handleView
    } = props;

    console.log(data)

    return (

        <Card sx={{ mt: 2 }}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        '& th': {
                            padding: "6px 16px"
                        }
                    }}

                >
                    <TableHead sx={{
                        backgroundColor: "primary.main",
                        color: "#fff",
                    }}>
                        <TableRow>
                            
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Order id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Customer
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Address
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Total price
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Chi tiết
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.filter((order) => order.status !== "pending").map((product, index) => (
                            <TableRow key={product.name}>
                                
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.order_id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {
                                            <CustomerName customerId={product?.customer_id} />
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.address?.city !== "" && product?.address?.street + ", " + product?.address?.city + ", " + product?.address?.state + ", "+ product?.address?.country || "N/A"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip label={product?.status} size='small' color={product?.status === "processing" ? "warning" : "success"} />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.total_price || 0} $
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' size='small' onClick={()=>handleView(product)}>
                                        <VisibilityIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    )
}

export default ManageOrdersTable
