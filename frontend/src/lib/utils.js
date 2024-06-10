// lấy item của option theo variant
export function findItemName(itemId, options) {
  return options.reduce((name, option) => {
    const item = option.items.find((item) => item.item_id === itemId);
    return name || (item && item.item_name);
  }, "");
}
export const getVariantPrice = (variants, checkedVariant, quantity = 1) => {
  const selectedVariant = variants?.find((variant) =>
    {
      // tìm checkendVariant trong variant
      return Object.keys(checkedVariant).every(
        (key) => variant[key] === checkedVariant[key]
      )
    }
  );

  return selectedVariant ? Number((selectedVariant.price * quantity).toFixed(2)) : 0;
};

export const getVariantId = (variants, checkedVariant) => {
  const selectedVariant = variants?.find((variant) =>
    Object.keys(checkedVariant).every(
      (key) => variant[key] === checkedVariant[key]
    )
  );

  return selectedVariant ? selectedVariant.variant_id : "";
}

export const getVariantPriceDetail = (
  variants,
  variantColor,
  variantMaterial,
  variantSize,
  quantity = 1
) => {
  const selectedVariant = variants?.find(
    (variant) =>
      variant.option1 === variantColor &&
      variant.option2 === variantMaterial &&
      variant.option3 === variantSize
  );

  return selectedVariant ? Number((selectedVariant.price * quantity).toFixed(2)) : 0;
};

export const getMedia = (id, src)  => {
  return 'http://localhost:8000/media/products/'+ id +  '/' + src;
}

export const getOptionName = (options, variant) => {
  const optionNames = [];

  for (let i = 1; i <= 3; i++) {
    const optionId = variant[0][`option${i}`];
    for (const option of options) {
      const item = option.items.find(item => item.item_id === optionId);
      if (item) {
        optionNames.push(item.item_name);
        break;
      }
    }
  }
  //Trả về string : Nếu có 3 option thì trả về 3 option cách nhau bởi dấu ','
  return optionNames.join(", ");
}