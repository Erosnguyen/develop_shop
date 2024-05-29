import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getProductById, getVariantById, updateOrderStatus } from './ManageOrdersServices';

export default function ManageOrdersDialog(props) {
  const { open, item, search, handleClose } = props;

  const [productDetail, setProductDetail] = useState();
  const [variantDetail, setvariantDetail] = useState();

  const orderQuantity = item?.items?.at(0).quantity;

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  const getVariantsById = useCallback(
    async (idPro) => {
      const res = await getVariantById(idPro);
      return res.data.variant;
    },
    [item?.items],
  );

  const fetchProductById = useCallback(
    async (variantId) => {
      const { data: dataVariant } = await getVariantById(variantId);
      setvariantDetail(dataVariant.variant);

      const { data: dataProduct } = await getProductById(dataVariant.variant?.product_id);
      setProductDetail(dataProduct.product);
    },
    [item?.items, getVariantsById],
  );

  useEffect(() => {
    const variantIdWithProp = item.items?.at(0).product_id;
    fetchProductById(variantIdWithProp);
  }, [item?.items, fetchProductById]);

  const handleUpdateStatus = async (label) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateOrderStatus(item?.id + 1, { status: label.toLowerCase() });
        } catch (error) {}
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
        });
      }
    });
  };

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
            // handleSubmit()
          },
        }}
      >
        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Stepper activeStep={0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel onClick={() => handleUpdateStatus(label)}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell align="center">Tên sản phẩm</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{1}</TableCell>
                      <TableCell align="center">{productDetail?.product_name}</TableCell>
                      <TableCell align="center">{orderQuantity}</TableCell>
                      <TableCell align="right">${variantDetail?.price}</TableCell>
                      <TableCell align="right">${variantDetail?.price * orderQuantity}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
