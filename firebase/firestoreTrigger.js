const saveInvoiceToDatabase = require("../services/invoiceService");
const gstCalculator = require("../utils/gstCalculator");
const gstApiService = require("../services/gstApiService");

exports.handleStatusChange = async (change, context) => {
  const before = change.before.data();
  const after = change.after.data();

  if (before.status !== "finished" && after.status === "finished") {
    const { name, totalBookingAmount } = after;

    // Calculate GST
    const { sgst, cgst, igst } = gstCalculator(totalBookingAmount);

    try {
      // Save invoice to database
      const invoice = await saveInvoiceToDatabase(name, totalBookingAmount, sgst, cgst, igst);

      // Integrate with GST API
      const gstApiResponse = await gstApiService.fileGstInvoice({
        invoiceId: invoice.id,
        name,
        totalBookingAmount,
        sgst,
        cgst,
        igst,
      });

      console.log("GST filing response:", gstApiResponse);
    } catch (error) {
      console.error("Error handling booking document:", error);
    }
  }
};
