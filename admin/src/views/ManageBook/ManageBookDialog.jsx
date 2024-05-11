import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { insertBook, updateBook } from './ManageBookServices';
import { getListGenre } from '../ManageGenre/ManageGenreServices';
import { toast } from 'react-toastify';

export default function ManageBookDialog(props) {
    let {
        open,
        item,
        search,
        handleClose
    } = props;
    const [state, setState] = useState({});
    const [option, setOption] = useState([]);

    const handleChange = (value, name) => {
        setState((pre) => ({ ...pre, [name]: value }));
    }

    const convertData = (value) => {
        return {
            idBook: value?.book_id,
            title: value?.title,
            author: value?.author,
            idGenre: value?.genre?.genre_id,
            quantity: value?.quantity,
            availableQuantity: value?.availableQuantity,
        }
    }

    const handleSubmit = async () => {
        try {
            const dataSubmit = convertData(state);
            if (state?.book_id) {
                await updateBook(dataSubmit);
                toast.success("Cập nhật thành công")
            } else {
                await insertBook(dataSubmit);
                toast.success("Thêm mới thành công")
            }
        } catch (error) {

        } finally {
            handleClose();
            search();
        }
    }

    const getListGenres = async () => {
        try {
            const data = await getListGenre();
            if (data?.status === 200) {
                setOption(data?.data);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getListGenres();
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
                <DialogTitle>Add/Update food</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="product_name"
                                label="product_name"
                                fullWidth
                                variant="standard"
                                value={state?.product_name}
                                onChange={(e) => handleChange(e.target.value, "product_name")}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="price"
                                label="price"
                                type='number'
                                fullWidth
                                variant="standard"
                                value={state?.price}
                                onChange={(e) => handleChange(e.target.value, "price")}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="stock"
                                label="stock"
                                type='number'
                                fullWidth
                                variant="standard"
                                value={state?.stock}
                                onChange={(e) => handleChange(e.target.value, "stock")}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12} sx={{ mt: "8px" }}>
                            <Autocomplete
                                options={["active", "no active"]}
                                fullWidth
                                value={state?.status}
                                defaultValue={item?.status}
                                onChange={(e, value) => handleChange(value, 'status')}
                                renderInput={(params) => <TextField
                                    {...params}
                                    required
                                    label="Status"
                                    variant="standard"
                                    value={state?.name}
                                />}
                            />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12} sx={{ mt: "8px" }}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={[
                                    {
                                        option_name: "string",
                                        items: [
                                            "string"
                                        ]
                                    }
                                ]}
                                getOptionLabel={(option) => option.option_name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="options"
                                        placeholder="Favorites"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: "8px" }}>
                            <TextField
                                multiline
                                required
                                margin="dense"
                                name="description"
                                label="description"
                                type='number'
                                fullWidth
                                variant="standard"
                                value={state?.description}
                                onChange={(e) => handleChange(e.target.value, "description")}
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
