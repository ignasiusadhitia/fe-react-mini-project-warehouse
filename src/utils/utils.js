export const formatDate = (date, locale = 'id-ID', options = {}) => {
  try {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(locale, {
      ...defaultOptions,
      ...options,
    });

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error('Invalid date:', date);
    return '-';
  }
};

export const formatCurrency = (amount, locale = 'id-ID', currency = 'IDR') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error('Invalid amount:', amount);
    return '-';
  }
};
