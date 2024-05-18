import React from "react";
import { TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";

export const CartTable = (props) => {

    const { product, item, idx } = props;

  return (
    <TableRow key={idx}>
      <TableCell>{product[idx]?.product_name}</TableCell>
      <TableCell>
        <Image
          width={100}
          height={100}
          src={
            product[idx]?.media != null
              ? product[idx]?.media[0]?.src
              : "src/assets/No_Image.png"
          }
        />
      </TableCell>
      <TableCell>{item?.items[0]?.quantity}</TableCell>
      <TableCell>${item?.total_price}</TableCell>
      <TableCell>
        <Tooltip color="danger" content="Xoá sản phẩm này?">
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <Button isIconOnly color="light">
              {/* <DeleteIcon /> */}
            </Button>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
