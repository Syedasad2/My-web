const express = require('express');
const router = express.Router();
const { createLoan, getLoans, getLoanById, updateLoanStatus } = require('../controllers/loanController');

// Create Loan
router.post('/create', createLoan);

// Get All Loans
router.get('/', getLoans);

// Get Loan by ID
router.get('/:id', getLoanById);

// Update Loan Status (Admin only)
router.put('/status/:loanId', updateLoanStatus);

module.exports = router;
