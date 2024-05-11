import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { muonsach, updateGenre } from './ManageBookBorrowServices';
import { toast } from 'react-toastify';
import { getAllBook } from '../ManageBook/ManageBookServices';

export default function ManageBookBorrowDialog(props) {
    let {
        open,
        item,
        search,
        handleClose
    } = props;
    const [state, setState] = useState({});
    const [option, setOption] = useState([]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState((pre) => ({ ...pre, [name]: value }));
    }

    const handleChangeBook = (value, name) => {
        setState((pre) => ({ ...pre, [name]: value }));
    }

    const formatDataSubmit = (value) => {
        return {
            bookID: value?.title?.book_id,
            ngayTraDuKien: value?.ngayTraDuKien,
            code: value?.code,
        }
    }
    const handleSubmit = async () => {
        try {
            if (state?.genre_id) {
                await updateGenre(state);
                toast.success("Cập nhật thành công")
            } else {
                await muonsach(formatDataSubmit(state));
                toast.success("Thêm mới thành công")
            }
        } catch (error) {

        } finally {
            handleClose();
            search();
        }
    }

    const getListBook = async () => {
        try {
            const data = await getAllBook();
            if (data?.status === 200) {
                setOption(data?.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getListBook();
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
                <DialogTitle>Thêm mới/Cập nhật phiếu mượn sách</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12} >
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="code"
                                label="Mã phiếu"
                                fullWidth
                                variant="standard"
                                value={state?.code || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12} sx={{ mt: "8px" }}>
                            <Autocomplete
                                options={option}
                                getOptionLabel={(option) => option.title || ""}
                                fullWidth
                                value={state?.title || ""}
                                defaultValue={item?.title || ""}
                                onChange={(e, value) => handleChangeBook(value, 'title')}
                                renderInput={(params) => <TextField
                                    {...params}
                                    required
                                    label="Sách"
                                    variant="standard"
                                    value={state?.title}
                                />}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12} >
                            <TextField
                                required
                                margin="dense"
                                name="ngayTraDuKien"
                                label="Ngày trả dự kiến"
                                fullWidth
                                type='date'
                                variant="standard"
                                value={state?.ngayTraDuKien || new Date()}
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
