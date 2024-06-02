// lấy item của option theo variant
export function findItemName(itemId, options) {
  return options.reduce((name, option) => {
    const item = option.items.find((item) => item.item_id === itemId);
    return name || (item && item.item_name);
  }, "");
}
export const getVariantPrice = (variants, checkedVariant, quantity = 1) => {
  const selectedVariant = variants?.find((variant) =>
    Object.keys(checkedVariant).every(
      (key) => variant[key] === checkedVariant[key]
    )
  );

  return selectedVariant ? Number((selectedVariant.price * quantity).toFixed(2)) : 0;
};
