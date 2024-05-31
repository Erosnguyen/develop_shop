import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ManageOrdersTableRow from './ManageOrdersTableRow';

function ManageOrdersTable({ data, handleView }) {
  return (
    <Card sx={{ mt: 2 }}>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            '& th': {
              padding: '6px 16px',
            },
          }}
        >
          <TableHead
            sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
            }}
          >
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Order id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Customer id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Created at
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Total price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Chi tiết
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((product, index) => (
              <ManageOrdersTableRow key={index} product={product} handleView={handleView} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

export default ManageOrdersTable;
