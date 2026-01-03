import * as payrollService from '../services/payrollService.js';

// Helper to format salary as INR in API responses
const formatSalaryINR = (value) => {
  if (value === null || value === undefined) return null;
  return `₹${Number(value).toLocaleString('en-IN')}`;
};

export const getMyPayroll = async (req, res, next) => {
  try {
    const payrolls = await payrollService.getMyPayroll(req.user.id, req.query);
    const payrollsWithINR = payrolls.map(p => ({
      ...p,
      baseSalaryINR: formatSalaryINR(p.baseSalary),
      allowancesINR: formatSalaryINR(p.allowances),
      deductionsINR: formatSalaryINR(p.deductions),
      netSalaryINR: formatSalaryINR(p.netSalary),
    }));
    res.status(200).json({
      success: true,
      data: payrollsWithINR,
      count: payrollsWithINR.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPayroll = async (req, res, next) => {
  try {
    const payrolls = await payrollService.getAllPayroll(req.query);
    const payrollsWithINR = payrolls.map(p => ({
      ...p,
      baseSalaryINR: formatSalaryINR(p.baseSalary),
      allowancesINR: formatSalaryINR(p.allowances),
      deductionsINR: formatSalaryINR(p.deductions),
      netSalaryINR: formatSalaryINR(p.netSalary),
    }));
    res.status(200).json({
      success: true,
      data: payrollsWithINR,
      count: payrollsWithINR.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createPayroll = async (req, res, next) => {
  try {
    const payroll = await payrollService.createPayroll(req.body, req);
    const payrollWithINR = {
      ...payroll,
      baseSalaryINR: formatSalaryINR(payroll.baseSalary),
      allowancesINR: formatSalaryINR(payroll.allowances),
      deductionsINR: formatSalaryINR(payroll.deductions),
      netSalaryINR: formatSalaryINR(payroll.netSalary),
    };
    res.status(201).json({
      success: true,
      message: 'Payroll created successfully',
      data: payrollWithINR,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePayroll = async (req, res, next) => {
  try {
    const payroll = await payrollService.updatePayroll(req.params.id, req.body, req);
    const payrollWithINR = {
      ...payroll,
      baseSalaryINR: formatSalaryINR(payroll.baseSalary),
      allowancesINR: formatSalaryINR(payroll.allowances),
      deductionsINR: formatSalaryINR(payroll.deductions),
      netSalaryINR: formatSalaryINR(payroll.netSalary),
    };
    res.status(200).json({
      success: true,
      message: 'Payroll updated successfully',
      data: payrollWithINR,
    });
  } catch (error) {
    next(error);
  }
};

