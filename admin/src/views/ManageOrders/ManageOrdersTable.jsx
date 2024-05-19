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
                                    Customer id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Created at
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
                        {data?.map((product, index) => (
                            <TableRow key={product.name}>
                                
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.customer_id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip label={product?.status} size='small' color={product?.status === "pending" ? "warning" : "success"} />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.created_at}
                                    </Typography>
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
