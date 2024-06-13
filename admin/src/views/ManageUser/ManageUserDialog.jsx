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
import { toast } from 'react-toastify';

export default function OrderDialog(props) {
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

    const convertDataSubmit = (value) => {
        return {
            email: value?.email,
            password: value?.password,
            password_confirm: value?.password_confirm,
            role: value?.role,
        }
    }

    const convertDataUpdate = (value) => {
        return {
            first_name: value?.first_name,
            last_name: value?.last_name
        }
    }

    const handleSubmit = async () => {
        try {
            const dataSubmit = convertDataSubmit(state);
            const dataSubmitUpdate = convertDataUpdate(state);
            if (state?.user_id == null) {
                console.log(dataSubmit)
                const res = await insertUser(dataSubmit);
                toast.success("Thêm thành công")
            } else {
                
            }
        } catch (error) {
            toast.error("Thêm thất bại")
        } finally {
            handleClose();
        }
    }

    useEffect(() => {
        setState({
            ...item?.user
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
                <DialogTitle>{state?.user_id == null ? "Insert User" : "User Infomation"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                disabled={state?.user_id ? true : false}
                                margin="dense"
                                name="email"
                                label="Email"
                                fullWidth
                                variant="standard"
                                value={state?.email || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        { state?.user_id == null &&<Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="password"
                                label="Password"
                                fullWidth
                                variant="standard"
                                value={state?.password || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>}
                        { state?.user_id == null && <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="password_confirm"
                                label="Password Confirm"
                                fullWidth
                                variant="standard"
                                value={state?.password_confirm || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>}
                        {state?.user_id && <Grid item md={12} sm={12} xs={12}>
                             <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="first_name"
                                label="First Name"
                                disabled
                                fullWidth
                                variant="standard"
                                value={state?.first_name || ""}
                                onChange={(e) => handleChange(e)}
                            />
                           
                        </Grid>
                         }
                        {state?.user_id && <Grid item md={12} sm={12} xs={12}>
                             <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="last_name"
                                label="Last Name"
                                disabled
                                fullWidth
                                variant="standard"
                                value={state?.last_name || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        }
                        <Grid item md={12} sm={12} xs={12}>
                            <Select disabled={state?.user_id ? true : false} sx={{ minWidth: 100}} name="role" value={state?.role || ""} onChange={(e) => handleChange(e)}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' size='small' color='primary' type="submit">Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
