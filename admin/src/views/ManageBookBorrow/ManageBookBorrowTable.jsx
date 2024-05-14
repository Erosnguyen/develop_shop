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
import { IconCreditCard } from '@tabler/icons';
import { chuyenNgayThanhChuoi, dinhDangTien } from 'src/AppConst';

function ManageBookBorrowTable(props) {
    let {
        data,
        handleOpenDelete
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
                            <TableCell sx={{ w: 10 }}>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Trả sách
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Tên sách
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Ngày mượn sách
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Ngày trả sách
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Ngày dự kiến
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Mã thẻ
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Tiền phạt
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
                                <TableCell sx={{ cursor: "pointer", w: 10 }}>
                                    {!product?.returnDate && <Button onClick={() => handleOpenDelete(product)} sx={{ minWidth: 0 }} variant='contained' size='small'><IconCreditCard size="1.3rem" /></Button>}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product?.book?.title}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                Tác giả: {product?.book?.author}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product?.borrowDate ? chuyenNgayThanhChuoi(product?.borrowDate) : ""}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                                        {product?.returnDate ? chuyenNgayThanhChuoi(product?.returnDate) : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                                        {product?.expectedDate ? chuyenNgayThanhChuoi(product?.expectedDate) : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                                        {product?.libraryCard?.code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                                        {dinhDangTien(product?.fineAmount)}
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

export default ManageBookBorrowTable
