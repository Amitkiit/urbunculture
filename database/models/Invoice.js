const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Invoice = sequelize.define("Invoice", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalBookingAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  sgst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cgst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  igst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

(async () => {
  await sequelize.sync({ force: false });
  console.log("Invoice table synced.");
})();

module.exports = Invoice;
