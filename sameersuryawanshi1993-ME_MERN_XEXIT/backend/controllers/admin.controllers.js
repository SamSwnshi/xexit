import Resignation from "../models/resignation.models.js";
import Notification from "../models/notification.models.js";
import ExitQuestionnaire from "../models/exitQuestionnaire.js";

export const concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    const resignation = await Resignation.findById(resignationId).populate(
      "employeeId",
      "username"
    );

    if (!resignation) {
      return res.status(404).json({ message: "Resignation not found" });
    }

    resignation.status = approved ? "approved" : "rejected";
    if (approved) {
      resignation.approvedLwd = new Date(lwd);
    }

    await resignation.save();

    await Notification.create({
      userId: resignation.employeeId._id,
      title: `Resignation ${approved ? "Approved" : "Rejected"}`,
      message: approved
        ? `Your resignation has been approved. Last working day: ${lwd}`
        : "Your resignation request has been rejected.",
    });

    res.json({ message: "Resignation updated successfully" });
  } catch (error) {
    console.error("Error updating resignation:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const viewAllResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find()
      .populate("employeeId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: resignations });
  } catch (error) {
    console.error("Error fetching resignations:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const exitResponse = async (req, res) => {
  try {
    const responses = await ExitQuestionnaire.find()
      .populate("employeeId", "username")
      .sort({ submittedAt: -1 });

    res.json({ data: responses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
