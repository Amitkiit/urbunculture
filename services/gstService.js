const axios = require("axios");

const fileGstInvoice = async (invoiceData) => {
  try {
    const apiUrl = process.env.GST_API_URL;
    const apiKey = process.env.GST_API_KEY;

    const response = await axios.post(
      apiUrl,
      {
        invoiceId: invoiceData.invoiceId,
        name: invoiceData.name,
        totalBookingAmount: invoiceData.totalBookingAmount,
        sgst: invoiceData.sgst,
        cgst: invoiceData.cgst,
        igst: invoiceData.igst,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error filing GST invoice:", error.response?.data || error.message);
    throw new Error("GST API Integration Failed");
  }
};

module.exports = { fileGstInvoice };
