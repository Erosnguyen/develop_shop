// lấy item của option theo variant
export function findItemName(itemId, options) {
  return options.reduce((name, option) => {
    const item = option.items.find((item) => item.item_id === itemId);
    return name || (item && item.item_name);
  }, "");
}
export const getVariantPrice = (
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

  return selectedVariant ? `${selectedVariant.price * quantity}$` : "0$";
};
