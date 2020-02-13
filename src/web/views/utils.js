const formatNumber = number => {
  return Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, Number(10000).toLocaleString().substring(2, 3));
};

export { formatNumber };
