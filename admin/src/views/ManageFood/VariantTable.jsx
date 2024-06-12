import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { set } from 'lodash';
import React, {useState, useEffect} from 'react';

export const VariantTable = (props) => {
  let { data, variants, handleSetVariantList, handleChangeStateEdit, stateEdit } = props;
  const [variantList, setVariantList] = useState([]);
  
  const getPrice = (option1, option2, option3) => {
    let price = 0;
    variantList?.forEach((variant) => {
        if (
            variant?.option1 == option1?.item_id &&
            variant?.option2 == option2?.item_id &&
            variant?.option3 == option3?.item_id
        ) {
            price = variant.price;
        }
        });
    return price;
  }

  useEffect(() => {
    setVariantList(variants?.map((variant) => {
        return {
            option1: variant.option1,
            option2: variant.option2,
            option3: variant.option3,
            price: variant.price,
            stock: variant.stock,
      };
    }));
  }, [variants]);

  const getStock = (option1, option2, option3) => { 
    let stock = 0;
    variantList?.forEach((variant) => {
        if (
            variant?.option1 == option1?.item_id &&
            variant?.option2 == option2?.item_id &&
            variant?.option3 == option3?.item_id
        ) {
            stock = variant.stock;
        }
    });
    return stock;
  }

  const handleChangePrice = (option1, option2, option3, value) => {
    setVariantList(
      variantList?.map((variant) => {
        if (
          variant.option1 == option1?.item_id &&
          variant.option2 == option2?.item_id &&
          variant.option3 == option3?.item_id
        ) {
          return {
            ...variant,
            price: parseInt(value),
          };
        }
        return variant;
      }),
    );
    handleChangeStateEdit("variant")
  };

  useEffect(() => {
    handleSetVariantList(variantList);
  }, [variantList]);


  console.log(variantList);

  return (
    <Table
    aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            '& th': {
              padding: '6px 16px',
            },
            border: '1px solid grey',
          }}
    >
      <TableHead sx={{
              backgroundColor: 'primary.main',
              color: 'white',
            }}>
        {data?.map((option) => (
          <TableCell key={option.option_id}>{option.option_name}</TableCell>
        ))}
        <TableCell>Giá</TableCell>
        <TableCell>Số lượng</TableCell>
      </TableHead>
      <TableBody>
        {data?.length === 3 &&
          data[0].items.map((option1, index1) =>
            data[1].items.map((option2, index2) =>
              data[2].items.map((option3, index3) => (
                <TableRow>
                  {option2.item_id === data[1].items[0].item_id && index3 === 0 && (
                    <TableCell sx={{ border: '1px solid grey' }} rowSpan={data[1].items.length * data[2].items.length}>
                      {option1.item_name}
                    </TableCell>
                  )}
                  {index3 === 0 && (
                    <TableCell sx={{ border: '1px solid grey' }} rowSpan={data[2].items.length}>{option2.item_name}</TableCell>
                  )}
                  {<TableCell sx={{ border: '1px solid grey' }}>{option3.item_name}</TableCell>}
                  <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField disabled={stateEdit != "variant" && stateEdit != null} type='number' onChange={(e) => handleChangePrice(option1, option2, option3, e.target.value)} value={getPrice(option1, option2, option3)} style={{width: "100px"}}  />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField disabled={stateEdit != "variant" && stateEdit != null} value={getStock(option1, option2, option3)} style={{width: "100px"}}  />
                  </TableCell>
                </TableRow>
              )),
            ),
          )}
          {
            data?.length === 2 &&
            data[0].items.map((option1, index1) =>
              data[1].items.map((option2, index2) => (
                <TableRow>
                  {index2 === 0 && (
                    <TableCell sx={{ border: '1px solid grey' }} rowSpan={data[1].items.length}>{option1.item_name}</TableCell>
                  )}
                  <TableCell sx={{ border: '1px solid grey' }}>{option2.item_name}</TableCell>
                  <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField type='number' onChange={(e) => handleChangePrice(option1, option2, null, e.target.value)} value={getPrice(option1, option2, null)} style={{width: "100px"}}  />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField value={getStock(option1, option2, null)} style={{width: "100px"}}  />
                  </TableCell>
                </TableRow>
              ))
            )
          }
            {
                data?.length === 1 &&
                data[0].items.map((option1, index1) => (
                <TableRow>
                    <TableCell sx={{ border: '1px solid grey' }}>{option1.item_name}</TableCell>
                    <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField type='number' onChange={(e) => handleChangePrice(option1, null, null, e.target.value)} value={getPrice(option1, null, null)} style={{width: "100px"}}  />
                    </TableCell>
                    <TableCell sx={{ border: '1px solid grey' }}>
                    <TextField value={getStock(option1, null, null)} style={{width: "100px"}}  />
                    </TableCell>
                </TableRow>
                ))
            }
      </TableBody>
    </Table>
  );
};
