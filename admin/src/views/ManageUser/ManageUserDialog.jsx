import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { insertUser, updateGenre } from './ManageUserServices';

export default function ManageUserDialog(props) {
    let {
        open,
        item,
        handleClose
    } = props;
    const [state, setState] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState((pre) => ({ ...pre, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            if (state?.genre_id) {
                await updateGenre(state);
            } else {
                await insertUser(state)
            }
        } catch (error) {

        } finally {
            handleClose();
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
                <DialogTitle>Thông tin người dùng</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="userName"
                                label="Tên đăng nhập"
                                fullWidth
                                variant="standard"
                                value={state?.userName || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="passWord"
                                label="Mật khẩu"
                                fullWidth
                                variant="standard"
                                value={state?.passWord || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="fullName"
                                label="Họ và tên"
                                fullWidth
                                variant="standard"
                                value={state?.fullName || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="userRole"
                                label="Vai trò"
                                fullWidth
                                variant="standard"
                                value={state?.userRole || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={handleClose}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
