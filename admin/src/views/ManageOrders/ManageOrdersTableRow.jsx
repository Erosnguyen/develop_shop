import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Chip, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { formatDate } from 'src/utils/format-date';
import { getUserById } from './ManageOrdersServices';

const ManageOrdersTableRow = ({ product, handleView }) => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserById(product?.customer_id);
        console.log('getUser ~ data:', data);
        if (data?.status === 200) {
        }
      } catch (error) {}
    };
    getUser();
  }, []);

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2">{product?.id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{product?.customer_id}</Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={product?.status}
          size="small"
          color={product?.status === 'pending' ? 'warning' : 'success'}
        />
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">
          {formatDate(product?.updated_at || product?.created_at)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">${product?.total_price || 0}</Typography>
      </TableCell>
      <TableCell>
        <Button variant="contained" size="small" onClick={() => handleView(product)}>
          <VisibilityIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ManageOrdersTableRow;
