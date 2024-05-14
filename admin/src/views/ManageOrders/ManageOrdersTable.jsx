import React from 'react'
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Card,
    Button
} from '@mui/material';

function ManageOrdersTable(props) {
    let {
        data,
    } = props;

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
                            <TableCell sx={{ width: 10, textAlign: "center" }}>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    STT
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Order id
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((product, index) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            width: 10,
                                            textAlign: "center"
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {product?.status}
                                    </Typography>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    )
}

export default ManageOrdersTable
