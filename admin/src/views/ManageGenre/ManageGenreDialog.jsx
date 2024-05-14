import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { insertGenre, updateGenre } from './ManageGenreServices';
import { toast } from 'react-toastify';

export default function ManageGenreDialog(props) {
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

    const handleSubmit = async () => {
        try {
            if (state?.genre_id) {
                await updateGenre(state);
                toast.success("Cập nhật thành công")
            } else {
                await insertGenre(state);
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
                <DialogTitle>Thêm mới/Cập nhật loại sách</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="genreName"
                                label="Tên loại sách"
                                fullWidth
                                variant="standard"
                                value={state?.genreName || ""}
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
