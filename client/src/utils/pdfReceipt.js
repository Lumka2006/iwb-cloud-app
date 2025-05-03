// utils/pdfReceipt.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateReceiptPDF = (purchase, res) => {
  const doc = new PDFDocument();

  // Stream PDF directly to response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="receipt.pdf"');
  doc.pipe(res);

  // Header
  doc.fontSize(18).text('Purchase Receipt', { align: 'center' });
  doc.moveDown();

  // Purchase info
  doc.fontSize(12).text(`Transaction ID: ${purchase.transactionId}`);
  doc.text(`Date: ${new Date(purchase.purchasedAt).toLocaleString()}`);
  doc.text(`Payment Method: ${purchase.paymentMethod}`);
  doc.text(`Total Amount: $${purchase.totalAmount.toFixed(2)}`);
  doc.moveDown();

  // Cart items
  doc.fontSize(14).text('Items Purchased:', { underline: true });
  doc.moveDown(0.5);
  purchase.cart.forEach((item, i) => {
    doc.fontSize(12).text(`${i + 1}. ${item.name} - $${item.price} x ${item.quantity}`);
  });

  // Footer
  doc.moveDown();
  doc.fontSize(10).text('Thank you for your purchase!', { align: 'center' });

  doc.end(); // Finalize PDF
};

module.exports = generateReceiptPDF;
