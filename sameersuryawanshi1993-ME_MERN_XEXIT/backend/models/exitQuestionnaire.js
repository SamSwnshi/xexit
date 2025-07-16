import mongoose from "mongoose";
const exitQuestionnaireSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responses: [{
    questionText: String,
    response: String
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const ExitQuestionnaire = mongoose.model('ExitQuestionnaire', exitQuestionnaireSchema);

export default ExitQuestionnaire;