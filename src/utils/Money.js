const FormatMoney = (amount) => {
  const value = typeof amount === 'object' ? amount.priceCents : amount;
  if (typeof value !== 'number') return '$0.00';
  return `$${(value / 100).toFixed(2)}`;
};

export default FormatMoney;
