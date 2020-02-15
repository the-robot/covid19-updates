const formatNumber = number => {
  return Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, Number(10000).toLocaleString().substring(2, 3));
};

const isNumber = number => {
  return /^-{0,1}\d+$/.test(number);
}

export { formatNumber, isNumber };
