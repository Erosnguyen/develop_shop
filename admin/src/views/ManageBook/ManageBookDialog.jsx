import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { addProduct, updateProduct } from './ManageBookServices';
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
            product_name: value?.product_name,
            product_id: value?.product_id,
            price: value?.price,
            stock: value?.stock,
            status: value?.status,
            description: value?.description,
            options: value?.listOption?.map(i => {
                return {
                    option_name: i?.option_name,
                    items: i?.items?.map(item => {
                        return item?.item_name
                    })
                }
            })


        }
    }
    const convertDataUpdate = (value) => {
        return {
            product_name: value?.product_name,
            status: value?.status,
            description: value?.description,
        }
    }

    const handleSubmit = async () => {
        try {
            const dataSubmit = convertData(state);
            const dataSubmitUpdate = convertDataUpdate(state);
            if (state?.product_id) {
                await updateProduct(state?.product_id, dataSubmitUpdate);
                toast.success("Cập nhật thành công")
            } else {
                await addProduct(dataSubmit);
                toast.success("Thêm mới thành công")
            }
        } catch (error) {

            console.log(error)
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

    const handleDeleteOptionItem = (itemId) => {
        let updatedListOption = state.listOption.map(option => {
            let updatedItems = option.items.filter(item => item.item_id !== itemId);
            return {
                ...option,
                items: updatedItems
            };
        });

        setState(prevState => ({
            ...prevState,
            listOption: updatedListOption
        }));
    }

    const handleDeleteOption = (opId) => {
        let updatedListOption = state.listOption.filter(option => option.option_id !== opId);
        setState(prevState => ({
            ...prevState,
            listOption: updatedListOption
        }));
    }

    useEffect(() => {
        setState({
            ...item,
            listOption: item?.options || []
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
                                label="Product name"
                                fullWidth
                                variant="standard"
                                value={state?.product_name}
                                onChange={(e) => handleChange(e.target.value, "product_name")}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                margin="dense"
                                name="price"
                                label="Price"
                                type='number'
                                fullWidth
                                variant="standard"
                                value={state?.price}
                                onChange={(e) => handleChange(e.target.value, "price")}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <TextField
                                margin="dense"
                                name="stock"
                                label="Stock"
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
                                label="Status"
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
                                label="Description"
                                fullWidth
                                variant="standard"
                                value={state?.description}
                                onChange={(e) => handleChange(e.target.value, "description")}
                            />
                        </Grid>
                        {!state?.product_id && <Grid item xs={12} >
                            <Button variant='contained' size='small' onClick={() => handleAddOption()}>Add option</Button>
                        </Grid>}
                    </Grid>
                    {state?.listOption?.map(i => {
                        return (
                            <Grid container spacing={2}>
                                <Grid item md={11} sm={11} xs={11} sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        margin="dense"
                                        name="option_name"
                                        label={"Option name"}
                                        fullWidth
                                        variant="standard"
                                        value={i?.option_name}
                                        onChange={(e) => handleChangeOptionName(e.target.value, i?.option_id)}
                                    />
                                </Grid>
                                <Grid item md={1} sm={1} xs={1}>
                                    {!state?.product_id && <Button onClick={() => handleDeleteOption(i?.option_id)} sx={{ minWidth: 0, mt: 3 }} variant='contained' size='small'><IconTrash size="1.3rem" /></Button>}
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

                                            {!state?.product_id && <Button onClick={() => handleDeleteOptionItem(item?.item_id)} sx={{ minWidth: 0, mt: 3 }} variant='contained' size='small'><IconTrash size="1.3rem" /></Button>}
                                        </Grid>
                                    )
                                })}
                                <Grid item md={2} sm={2} xs={2}>
                                    {!state?.product_id && <Button sx={{ mt: 3 }} variant='contained' size='small' onClick={() => handleAddDetailOption(i?.option_id)}>Add detail</Button>}
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
