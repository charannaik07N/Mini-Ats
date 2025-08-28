import Candidate from "../models/Candidate.js";
import { validationResult } from "express-validator";

// Get all candidates with filtering and search
export const getCandidates = async (req, res) => {
  try {
    const { status, role, search, sortBy = 'appliedDate', sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by role
    if (role && role !== 'all') {
      query.role = new RegExp(role, 'i');
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { role: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const candidates = await Candidate.find(query).sort(sortOptions);
    res.json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching candidates',
      error: error.message
    });
  }
};

// Add new candidate
export const addCandidate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    
    res.status(201).json({
      success: true,
      message: 'Candidate added successfully',
      data: newCandidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding candidate',
      error: error.message
    });
  }
};

// Update candidate (for drag & drop status changes)
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updated = await Candidate.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Candidate updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating candidate',
      error: error.message
    });
  }
};

// Delete candidate
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Candidate.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting candidate',
      error: error.message
    });
  }
};

// Get single candidate
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const candidate = await Candidate.findById(id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching candidate',
      error: error.message
    });
  }
};

// Analytics endpoints
export const getAnalytics = async (req, res) => {
  try {
    // Get candidates by status
    const statusStats = await Candidate.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get candidates by role
    const roleStats = await Candidate.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get average experience
    const experienceStats = await Candidate.aggregate([
      {
        $group: {
          _id: null,
          avgExperience: { $avg: '$experience' },
          totalCandidates: { $sum: 1 },
          minExperience: { $min: '$experience' },
          maxExperience: { $max: '$experience' }
        }
      }
    ]);

    // Get recent applications (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentApplications = await Candidate.countDocuments({
      appliedDate: { $gte: thirtyDaysAgo }
    });

    // Get applications by month for trend analysis
    const monthlyTrend = await Candidate.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$appliedDate' },
            month: { $month: '$appliedDate' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.json({
      success: true,
      data: {
        statusDistribution: statusStats,
        roleDistribution: roleStats,
        experienceStats: experienceStats[0] || {
          avgExperience: 0,
          totalCandidates: 0,
          minExperience: 0,
          maxExperience: 0
        },
        recentApplications,
        monthlyTrend
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};
