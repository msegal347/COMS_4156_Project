// src/controllers/analyticsController.ts

import * as AnalyticsService from '../services/analyticsService';

// Create a new analytics record
export const createRecord = async (req, res, next) => {
  try {
    const recordData = req.body;
    const newRecord = await AnalyticsService.createRecord(recordData);
    res.status(201).json(newRecord);
  } catch (err) {
    next(err);
  }
};

// Get an analytics record by ID
export const getRecordById = async (req, res, next) => {
  try {
    const recordId = req.params.id;
    const record = await AnalyticsService.getRecordById(recordId);
    res.status(200).json(record);
  } catch (err) {
    next(err);
  }
};

// Update an analytics record by ID
export const updateRecordById = async (req, res, next) => {
  try {
    const recordId = req.params.id;
    const updatedData = req.body;
    const updatedRecord = await AnalyticsService.updateRecordById(recordId, updatedData);
    res.status(200).json(updatedRecord);
  } catch (err) {
    next(err);
  }
};

// Delete an analytics record by ID
export const deleteRecordById = async (req, res, next) => {
  try {
    const recordId = req.params.id;
    await AnalyticsService.deleteRecordById(recordId);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
