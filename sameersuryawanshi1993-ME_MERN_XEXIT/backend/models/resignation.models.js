import mongoose from "mongoose";


const resignationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lwd: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedLwd: {
    type: Date
  },
  reason: {
    type: String
  }
}, { timestamps: true });

const Resignation = mongoose.model("Resignation", resignationSchema);

export default Resignation;
