import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { addCard, editCard } from './ManageCardServices';
import { toast } from 'react-toastify';
import { convertDate, convertToDateTime } from '../../AppConst';

export default function ManageCardDialog(props) {
    let {
        open,
        item,
        search,
        handleClose
    } = props;
    const [state, setState] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState((pre) => ({ ...pre, [name]: value }));
    }
    const formatDataSunmit = (value) => {
        return {
            ...value,
            issueDate: convertToDateTime(value?.issueDate),
            expiryDate: convertToDateTime(value?.expiryDate),
        }
    }
    const handleSubmit = async () => {
        try {
            if (state?.card_id) {
                await editCard(formatDataSunmit(state));
                toast.success("Cập nhật thành công")
            } else {
                await addCard(formatDataSunmit(state));
                toast.success("Thêm mới thành công")
            }
        } catch (error) {

        } finally {
            handleClose();
            search();
        }
    }

    useEffect(() => {
        setState({
            ...item,
            expiryDate: convertDate(item?.expiryDate),
            issueDate: convertDate(item?.issueDate)
        })
    }, [item])
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit()
                    },
                }}
            >
                <DialogTitle>Thêm mới/Cập nhật thẻ Food</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="code"
                                label="Mã thẻ"
                                fullWidth
                                variant="standard"
                                value={state?.code || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="issueDate"
                                type='date'
                                label="Ngày phát hành"
                                fullWidth
                                variant="standard"
                                value={state?.issueDate || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="expiryDate"
                                type='date'
                                label="Ngày hết hạn"
                                fullWidth
                                variant="standard"
                                value={state?.expiryDate || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="msv"
                                label="Mã sinh viên"
                                fullWidth
                                variant="standard"
                                value={state?.msv || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="tenSinhVien"
                                label="Tên sinh viên"
                                fullWidth
                                variant="standard"
                                value={state?.tenSinhVien || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="lopQuanLy"
                                label="Lớp quản lý"
                                fullWidth
                                variant="standard"
                                value={state?.lopQuanLy || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' size='small' type="submit">Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
