const gstCalculator = (totalBookingAmount) => {
    const gstRate = 18; // 18% GST
    const gstAmount = (totalBookingAmount * gstRate) / 100;
  
    const sgst = gstAmount / 2; // 50% of GST
    const cgst = gstAmount / 2; // 50% of GST
    const igst = gstAmount; // Entire GST as IGST for inter-state transactions
  
    return { sgst, cgst, igst };
  };
  
  module.exports = gstCalculator;
  