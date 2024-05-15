import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { insertStaff, updateStaff } from './ManageStaffServices';
import { toast } from 'react-toastify';

export default function ManageStaffDialog(props) {
    let {
        open,
        item,
        handleClose,
        search
    } = props;
    const [state, setState] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState((pre) => ({ ...pre, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            if (state?.staff_id) {
                await updateStaff(state);
                toast.success("Cập nhật thành công")
            } else {
                await insertStaff(state)
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
            ...item
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
                <DialogTitle>Thêm mới/Cập nhật nhân viên</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="staffName"
                                label="Tên nhân viên"
                                fullWidth
                                variant="standard"
                                value={state?.staffName || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="staffContact"
                                label="Số điện thoại"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={state?.staffContact || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="staffPosition"
                                label="Vai trò"
                                fullWidth
                                variant="standard"
                                value={state?.staffPosition || ""}
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
