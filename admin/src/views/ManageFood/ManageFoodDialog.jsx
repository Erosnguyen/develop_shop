import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import {
  addProduct,
  addProductImage,
  deleteProductImage,
  updateProduct,
} from './ManageFoodServices';
import { toast } from 'react-toastify';
import { IconTrash } from '@tabler/icons';
import {
  Avatar,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import './ManageFood.css';
import { getMedia } from 'src/utils/utils';
import { VariantTable } from './VariantTable';

export default function ManageFoodDialog(props) {
  let { open, item, search, handleClose } = props;
  const [state, setState] = useState(null);
  const [updatedImage, setUpdatedImage] = useState('');
  const [imageData, setImageData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [variantList, setVariantList] = useState([]);
  const [stateEdit, setStateEdit] = useState(null);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const handleChange = (value, name) => {
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const handleSetVariantList = (value) => {
    setVariantList(value);
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!imageData.some((e) => e.name === files[i].name)) {
        setImageData((prev) => [
          ...prev,
          {
            file: files[i],
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const deleteImage = (index) => {
    setImageData((prev) => prev.filter((_, i) => i !== index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!imageData.some((e) => e.name === files[i].name)) {
        setImageData((prev) => [
          ...prev,
          {
            file: files[i],
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const convertData = (value) => {
    return {
      product_name: value?.product_name,
      product_id: value?.product_id,
      price: value?.price,
      stock: value?.stock,
      status: value?.status,
      description: value?.description,
      options: value?.listOption?.map((i) => {
        return {
          option_name: i?.option_name,
          items: i?.items?.map((item) => {
            return item?.item_name;
          }),
        };
      }),
    };
  };

  const convertDataUpdate = (value) => {
    if (stateEdit == "variant") {
      return {
        product_name: value?.product_name,
        status: value?.status,
        description: value?.description,
        variants: variantList ,
      };
    }
    else if (stateEdit == "option") {
      return {
        product_name: value?.product_name,
        status: value?.status,
        description: value?.description,
        options: state?.listOption?.map((option) => {
          return {
            option_name: option?.option_name,
            items: option?.items?.map((item) => {
              return item?.item_name;
            }),
          };
        }) ,
      };
    }
    return {
      product_name: value?.product_name,
      status: value?.status,
      description: value?.description,
    };
  };

  const handleSubmit = async () => {
    try {
      const dataSubmit = convertData(state);
      const dataSubmitUpdate = convertDataUpdate(state);
      if (state?.product_id) {
        await updateProduct(state?.product_id, dataSubmitUpdate);
        if (imageData.length > 0) {
          const formData = new FormData();
          imageData.forEach((file, index) => {
            formData.append(`x_files`, file.file);
            console.log(file.file)
           }); 

          await addProductImage(state?.product_id, formData);
          toast.success('Cập nhật thành công');
          // toast.success("Cập nhật ảnh thành công")
        } else {
          toast.success('Cập nhật thành công');
        }
      } else {
        const res = await addProduct(dataSubmit);
        if (res.status === 201) {
          const newProductId = res.data.product.product_id;
          if (imageData.length > 0) {
            const formData = new FormData();
            imageData.forEach((file, index) => {
                formData.append(`x_files`, file.file);
                console.log(file.file)
            });
            // formData.append('x_files', imageData[0].file);
            await addProductImage(newProductId, formData);
            toast.success('Thêm sản phẩm thành công');
          } else {
            toast.success('Thêm sản phẩm thành công');
          }
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra');
      console.log(error);
    } finally {
      handleClose();
      search();
    }
  };

  const handleAddOption = () => {
    setState((pre) => ({
      ...pre,
      listOption: [...state.listOption, { option_id: Math.random(), items: [] }],
    }));
  };

  const handleAddDetailOption = (idParent) => {
    let updatedListOption = state.listOption.map((i) => {
      if (i.option_id === idParent) {
        return {
          ...i,
          items: [
            ...i.items,
            {
              item_id: Math.random(),
            },
          ],
        };
      }
      return i;
    });

    setState((prevState) => ({
      ...prevState,
      listOption: updatedListOption,
    }));
  };

  const handleChangeOptionName = (value, id) => {
    let updatedListOption = state.listOption.map((i) => {
      if (i.option_id === id) {
        return {
          ...i,
          option_name: value,
        };
      }
      return i;
    });

    setState((prevState) => ({
      ...prevState,
      listOption: updatedListOption,
    }));
  };

  const handleChangeItemName = (value, id, idParent) => {
    let updatedListOption = state.listOption.map((option) => {
      if (option.option_id === idParent) {
        let updatedItems = option.items.map((item) => {
          if (item.item_id === id) {
            return {
              ...item,
              item_name: value,
            };
          }
          return item;
        });
        return {
          ...option,
          items: updatedItems,
        };
      }
      return option;
    });

    setState((prevState) => ({
      ...prevState,
      listOption: updatedListOption,
    }));
  };

  const handleDeleteOptionItem = (itemId) => {
    let updatedListOption = state.listOption.map((option) => {
      let updatedItems = option.items.filter((item) => item.item_id !== itemId);
      return {
        ...option,
        items: updatedItems,
      };
    });

    setState((prevState) => ({
      ...prevState,
      listOption: updatedListOption,
    }));
  };

  const handleDeleteOption = (opId) => {
    let updatedListOption = state.listOption.filter((option) => option.option_id !== opId);
    setState((prevState) => ({
      ...prevState,
      listOption: updatedListOption,
    }));
  };

  const handleRemove = async (mediaId) => {
    try {
      const data = await deleteProductImage(mediaId, state?.product_id);
      if (data?.status === 200) {
        let updateListMedia = state?.media.filter((i) => i?.media_id !== mediaId);
        setState((pre) => ({ ...pre, media: updateListMedia }));
        toast.success('Xóa ảnh thành công');
      } else {
        toast.error('Xóa ảnh thất bại');
      }
    } catch (error) {}
  };

  //   const handleImageChange = (e) => {
  //     const newImage = e.target.files[0];
  //     if (newImage) {
  //       setUpdatedImage(newImage);
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setImageData(reader.result);
  //       };
  //       reader.readAsDataURL(newImage);
  //     }
  //   };
  useEffect(() => {
    setState({
      ...item,
      listOption: item?.options || [],
    });
  }, [item]);

  const handleChangeStateEdit = (value) => {
    setStateEdit(value);
  };

  // console.log(state)
  console.log(item);

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
            handleSubmit();
          },
        }}
      >
        <DialogTitle>Add/Update food</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                name="product_name"
                label="Product name"
                fullWidth
                variant="standard"
                value={state?.product_name}
                onChange={(e) => handleChange(e.target.value, 'product_name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={state?.product_id}
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={state?.price}
                onChange={(e) => handleChange(e.target.value, 'price')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={state?.product_id}
                margin="dense"
                name="stock"
                label="Stock"
                type="number"
                fullWidth
                variant="standard"
                value={state?.stock}
                onChange={(e) => handleChange(e.target.value, 'stock')}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                required
                margin="dense"
                name="status"
                label="Status"
                fullWidth
                variant="standard"
                value={state?.status}
                onChange={(e) => handleChange(e.target.value, 'status')}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state?.status || item?.status}
                  label="Status"
                  onChange={(e) => handleChange(e.target.value, 'status')}
                >
                  <MenuItem key={'active'} value={'active'}>
                    Active
                  </MenuItem>
                  <MenuItem key={'inactive'} value={'inactive'}>
                    Inactive
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                required
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="standard"
                value={state?.description}
                onChange={(e) => handleChange(e.target.value, 'description')}
              />
            </Grid>
            <Grid item xs={12}>
              {
                state?.options?.length > 0 &&
                <VariantTable data={state?.options} variants={state?.variants} handleSetVariantList={handleSetVariantList} handleChangeStateEdit={handleChangeStateEdit} stateEdit={stateEdit}  />
              }
            </Grid>
            {
              <Grid item xs={12}>
                <Button
                  disabled={state?.options?.length >= 3 || stateEdit != "option" && stateEdit != null}
                  variant="contained"
                  size="small"
                  onClick={() => handleAddOption()}
                >
                  Add option
                </Button>
              </Grid>
            }
          </Grid>
          
          {state?.listOption?.map((i, idx) => {
            return (
              <Grid container spacing={2}>
                <Grid item md={11} sm={11} xs={11} sx={{ mt: 1 }}>
                  <TextField
                    disabled={stateEdit != "option" && stateEdit != null}
                    required
                    margin="dense"
                    name={`option_name`}
                    label={'Option name'}
                    fullWidth
                    variant="standard"
                    value={i?.option_name}
                    onChange={(e) => {
                      handleChangeOptionName(e.target.value, i?.option_id)
                      setStateEdit("option")
                    }}
                  />
                </Grid>
                <Grid item md={1} sm={1} xs={1}>
                  {
                    <Button
                      disabled={stateEdit != "option" && stateEdit != null}
                      onClick={() => {
                        handleDeleteOption(i?.option_id)
                        setStateEdit("option")
                      }}
                      sx={{ minWidth: 0, mt: 3 }}
                      variant="contained"
                      size="small"
                    >
                      <IconTrash size="1.3rem" />
                    </Button>
                  }
                </Grid>
                
                {i?.items?.map((item) => {
                  return (
                    <Grid
                      item
                      md={10}
                      sm={10}
                      xs={10}
                      sx={{ display: 'flex', marginLeft: '40px', marginRight: '10px' }}
                    >
                      <TextField
                        disabled={stateEdit != "option" && stateEdit != null}
                        required
                        margin="dense"
                        name="item_name"
                        label="Item name"
                        fullWidth
                        variant="standard"
                        value={item?.item_name}
                        onChange={(e) =>{
                          handleChangeItemName(e.target.value, item?.item_id, i?.option_id)
                          setStateEdit("option")
                        }}
                      />

                      {
                        <Button
                          disabled={stateEdit != "option" && stateEdit != null}
                          onClick={() => {
                            handleDeleteOptionItem(item?.item_id)
                            setStateEdit("option")
                          }}
                          sx={{ minWidth: 0, mt: 3 }}
                          variant="contained"
                          size="small"
                        >
                          <IconTrash size="1.3rem" />
                        </Button>
                      }
                    </Grid>
                  );
                })}
                <Grid item md={2} sm={2} xs={2}>
                  {
                    <Button
                    disabled={stateEdit != "option" && stateEdit != null}
                      sx={{ mt: 3 }}
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleAddDetailOption(i?.option_id)
                        setStateEdit("option")
                      }}
                    >
                      Add detail
                    </Button>
                  }
                </Grid>
              </Grid>
            );
          })}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ImageList cols={3}>
                {state?.media?.map((item, x) => (
                  <ImageListItem key={x} sx={{ position: 'relative' }}>
                    <img
                      srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${getMedia(
                        state.product_id,
                        item.src,
                      )}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.alt}
                      loading="lazy"
                    />
                    <div
                      onClick={() => handleRemove(item?.media_id)}
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        color: 'red',
                        cursor: 'pointer',
                      }}
                    >
                      <RemoveCircle />
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12}>
              <div className="card">
                <div
                  className="drag-area"
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  {isDragging ? (
                    <span className="select">Drop Image Here</span>
                  ) : (
                    <>
                      Drag & Drop Image Here or{' '}
                      <span className="select" role="button" onClick={selectFiles}>
                        Browse
                      </span>
                    </>
                  )}
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    className="file"
                    multiple
                    // onChange={handleImageChange}
                    ref={fileInputRef}
                    onChange={onFileSelect}
                  />
                </div>
                <div className="container">
                  {imageData?.map((image, index) => (
                    <div className="image" key={index}>
                      <span onClick={() => deleteImage(index)} className="delete">
                        &times;
                      </span>
                      <img src={image.url} alt={image.name} />
                    </div>
                  ))}
                </div>
                {/* <button type="button">Upload</button> */}
              </div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" size="small" color="error" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" size="small" type="submit">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
