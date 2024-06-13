import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Button,
  Chip,
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import { convertDateFormat } from 'src/AppConst';
import { getMedia } from 'src/utils/utils';

function ManageFoodTable(props) {
  let { data, handleEdit, handleOpenDelete } = props;
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
              <TableCell sx={{ width: 10, textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  STT
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Food name
                </Typography>
              </TableCell>
              <TableCell style={{ width: 300 }}>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Desc
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Create date
                </Typography>
              </TableCell>
              {/* <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600} color={"white"}>
                                    Số lượng có sẵn
                                </Typography>
                            </TableCell> */}
              <TableCell sx={{ w: 10 }}>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>
                  Thao tác
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      width: 10,
                      textAlign: 'center',
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ mr: 1 }}>
                      <img
                        style={{ width: 50, height: 50 }}
                        src={product?.media?.length ? getMedia(product?.product_id, product?.media[0]?.src) : ''}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product?.product_name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 300 }}>
                  <Typography
                    style={{
                      width: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product?.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={product?.status}
                    size="small"
                    color={product?.status === 'active' ? 'success' : 'error'}
                  />
                  {/* <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {product?.status}
                  </Typography> */}
                </TableCell>
                <TableCell align="center">
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                    {convertDateFormat(product?.created_at)}
                  </Typography>
                </TableCell>
                {/* <TableCell align="center">
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                    {product?.availableQuantity}
                  </Typography>
                </TableCell> */}
                <TableCell sx={{ cursor: 'pointer', w: 10 }}>
                  <Button
                    onClick={() => handleEdit(product)}
                    sx={{ minWidth: 0, mr: 1 }}
                    variant="contained"
                    size="small"
                  >
                    <IconEdit size="1.3rem" />
                  </Button>
                  <Button
                    onClick={() => handleOpenDelete(product)}
                    sx={{ minWidth: 0 }}
                    variant="contained"
                    size="small"
                  >
                    <IconTrash size="1.3rem" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

export default ManageFoodTable;
