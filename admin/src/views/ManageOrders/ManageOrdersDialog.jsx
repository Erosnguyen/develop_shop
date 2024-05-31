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

const steps = [
  {
    id: 0,
    label: 'Pending',
    field: 'pending',
  },
  {
    id: 1,
    label: 'Processing',
    field: 'processing',
  },
  {
    id: 2,
    label: 'Shipped',
    field: 'shipped',
  },
  {
    id: 3,
    label: 'Delivered',
    field: 'delivered',
  },
];

export default function ManageOrdersDialog(props) {
  const { open, item, handleClose, getOrders } = props;
  const variantIdWithProp = item.items?.at(0).product_id;

  const [productDetail, setProductDetail] = useState();
  const [variantDetail, setVariantDetail] = useState();

  const orderQuantity = item?.items?.at(0).quantity;

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
      setVariantDetail(dataVariant.variant);

      const { data: dataProduct } = await getProductById(dataVariant.variant?.product_id);
      setProductDetail(dataProduct.product);
    },
    [item?.items, getVariantsById],
  );

  useEffect(() => {
    fetchProductById(variantIdWithProp);
  }, [item?.items, fetchProductById]);

  const handleUpdateStatus = async (label) => {
    const currentIndex = steps.findIndex((step) => step.field === item?.status);
    const nextIndex = currentIndex + 1;
    const nextField = steps[nextIndex] ? steps[nextIndex].field : null;

    if (label === nextField) {
      const { isConfirmed } = await Swal.fire({
        title: 'Thay đổi trạng thái?',
        text: `Bạn muốn thay đổi trạng thái đơn hàng thành ${nextField}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        reverseButtons: true,
      });
      if (isConfirmed) {
        try {
          await updateOrderStatus(item.id, { status: nextField });
          await getOrders();
          handleClose();
          Swal.fire('Success', '', 'success');
        } catch (error) {
          handleClose();
          Swal.fire('Oops!', '', 'error');
        }
      }
    }
  };

  const activeStep = steps.findIndex((step) => step.field === item?.status);

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
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={step.id} onClick={() => handleUpdateStatus(step.field)}>
                    <StepLabel>{step.label}</StepLabel>
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
