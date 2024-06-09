import React, { useReducer } from 'react'
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
import { IconEye } from '@tabler/icons';
import { IconEdit, IconTrash } from '@tabler/icons';

function ManageGenreTable(props) {
    let {
        data,
        handleEdit,
        handleOpenDelete
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
                            <TableCell sx={{ width: 10, textAlign: "center" }}>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    STT
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    First Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Lastname
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Role
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Verified
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ w: 10 }}>
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Thao tác
                                </Typography>
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((user, index) => (
                            <TableRow key={index}>
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
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {user?.user?.first_name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {user?.user?.last_name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {user?.user?.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip size='small' label={user?.user?.role} color={user?.user?.role == "admin"  ? "warning" : "primary"} />
                                </TableCell>
                                <TableCell>
                                    <Chip size='small' label={user?.user?.is_verified_email ? "Đã xác thực" : "Chưa xác thực"} color={user?.user?.is_verified_email ? "success" : "error"} />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{ minWidth: 0, mr: 1 }}
                                        onClick={() => handleEdit(user)}
                                    >
                                        <IconEye size="1.3rem" />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ minWidth: 0, mr: 1 }}
                                        onClick={() => handleOpenDelete(user)}
                                    >
                                        <IconTrash size="1.3rem" />
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

export default ManageGenreTable
