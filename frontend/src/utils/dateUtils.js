export const isValidPurchaseDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if date is not in the past
  if (selectedDate < today) {
    return { valid: false, message: 'Date cannot be in the past' };
  }
  
  // Check if date is not Sunday (0 = Sunday)
  if (selectedDate.getDay() === 0) {
    return { valid: false, message: 'Sunday delivery is not available' };
  }
  
  return { valid: true };
};

export const getMinDate = () => {
  const today = new Date();
  // If today is Sunday, set minimum date to Monday
  if (today.getDay() === 0) {
    today.setDate(today.getDate() + 1);
  }
  return today.toISOString().split('T')[0];
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};