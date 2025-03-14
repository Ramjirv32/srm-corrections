import mongoose from 'mongoose';

const paperSubmissionSchema = new mongoose.Schema({
  submissionId: {
    type: String,
    unique: true,
    required: true
  },
  paperTitle: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  topic: String,
  abstractFileUrl: String,
  status: {
    type: String,
    default: 'Under Review'
  }
}, { timestamps: true });

export const PaperSubmission = mongoose.model('PaperSubmission', paperSubmissionSchema);