import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { insertUser, updateGenre } from './ManageUserServices';
import { Select, MenuItem } from '@mui/material';

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
            ...item.user
        })
    }, [item])

    console.log(state)
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
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="email"
                                label="Email"
                                fullWidth
                                variant="standard"
                                value={state?.email || ""}
                                disabled
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="first_name"
                                label="First Name"
                                fullWidth
                                variant="standard"
                                value={state?.first_name || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="last_name"
                                label="Last Name"
                                fullWidth
                                variant="standard"
                                value={state?.last_name || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Select sx={{ minWidth: 100}} name="role" value={state?.role || ""} onChange={(e) => handleChange(e)}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' size='small' color='primary' type="submit" onClick={handleSubmit}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
