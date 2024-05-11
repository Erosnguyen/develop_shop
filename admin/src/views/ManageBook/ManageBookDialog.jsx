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
import { IconTrash } from '@tabler/icons';

export default function ManageBookDialog(props) {
    let {
        open,
        item,
        search,
        handleClose
    } = props;
    const [state, setState] = useState({});

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

    const handleAddOption = () => {
        setState((pre) => ({ ...pre, listOption: [...state.listOption, { option_id: Math.random(), items: [] }] }));
    }

    const handleAddDetailOption = (idParent) => {
        let updatedListOption = state.listOption.map(i => {
            if (i.option_id === idParent) {
                return {
                    ...i,
                    items: [
                        ...i.items,
                        {
                            item_id: Math.random(),
                        }
                    ]
                };
            }
            return i;
        });

        setState(prevState => ({
            ...prevState,
            listOption: updatedListOption
        }));
    }

    const handleChangeOptionName = (value, id) => {
        let updatedListOption = state.listOption.map(i => {
            if (i.option_id === id) {
                return {
                    ...i,
                    option_name: value
                };
            }
            return i;
        });

        setState(prevState => ({
            ...prevState,
            listOption: updatedListOption
        }))
    }

    const handleChangeItemName = (value, id, idParent) => {
        let updatedListOption = state.listOption.map(option => {
            if (option.option_id === idParent) {
                let updatedItems = option.items.map(item => {
                    if (item.item_id === id) {
                        return {
                            ...item,
                            item_name: value
                        };
                    }
                    return item;
                });
                return {
                    ...option,
                    items: updatedItems
                };
            }
            return option;
        });

        setState(prevState => ({
            ...prevState,
            listOption: updatedListOption
        }));
    }

    useEffect(() => {
        setState({
            ...item,
            listOption: []
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
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                required
                                margin="dense"
                                name="status"
                                label="status"
                                fullWidth
                                variant="standard"
                                value={state?.status}
                                onChange={(e) => handleChange(e.target.value, "status")}
                            />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12}>
                            <TextField
                                multiline
                                required
                                margin="dense"
                                name="description"
                                label="description"
                                fullWidth
                                variant="standard"
                                value={state?.description}
                                onChange={(e) => handleChange(e.target.value, "description")}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant='contained' size='small' onClick={() => handleAddOption()}>Add option</Button>
                        </Grid>
                    </Grid>
                    {state?.listOption?.map(i => {
                        return (
                            <Grid container spacing={2}>
                                <Grid item md={11} sm={11} xs={11}>
                                    <TextField
                                        required
                                        margin="dense"
                                        name="option_name"
                                        label="Option name"
                                        fullWidth
                                        variant="standard"
                                        value={i?.option_name}
                                        onChange={(e) => handleChangeOptionName(e.target.value, i?.option_id)}
                                    />
                                </Grid>
                                <Grid item md={1} sm={1} xs={1}>
                                    <Button sx={{ minWidth: 0, mt: 3 }} variant='contained' size='small'><IconTrash size="1.3rem" /></Button>
                                </Grid>
                                {i?.items?.map(item => {
                                    return (
                                        <Grid item md={10} sm={10} xs={10} sx={{ display: "flex" }}>
                                            <TextField
                                                required
                                                margin="dense"
                                                name="item_name"
                                                label="Item name"
                                                fullWidth
                                                variant="standard"
                                                value={item?.item_name}
                                                onChange={(e) => handleChangeItemName(e.target.value, item?.item_id, i?.option_id)}
                                            />

                                            <Button sx={{ minWidth: 0, mt: 3 }} variant='contained' size='small'><IconTrash size="1.3rem" /></Button>
                                        </Grid>
                                    )
                                })}
                                <Grid item md={2} sm={2} xs={2}>
                                    <Button sx={{ mt: 3 }} variant='contained' size='small' onClick={() => handleAddDetailOption(i?.option_id)}>Add detail</Button>
                                </Grid>
                            </Grid>
                        )
                    })}
                </DialogContent>

                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' size='small' type="submit">Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
