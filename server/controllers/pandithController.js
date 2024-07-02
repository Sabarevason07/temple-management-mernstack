import BookingModel from "../Models/BookingModel.js";
import PandithModel from "../Models/PandithModel.js";
import UserModel from "../Models/UserModel.js";

//************** GET PANDITH INFO ***********/
export const getPandithInfo = async (req, res) => {
  try {
    const pandith = await PandithModel.findOne({ userId: req.body.userId });
    if (!pandith) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pandith data fetched successfully!",
      data: pandith,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** UPDATE PANDITH PROFILE ***********/
export const updatePandithProfile = async (req, res) => {
  try {
    const pandith = await PandithModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    //Validation
    if (!pandith) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    //Success res
    return res.status(201).json({
      success: true,
      message: "Pandith Profile Updated!",
      data: pandith,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET PANDITH BY ID *************/
export const getPandithById = async (req, res) => {
  try {
    const pandith = await PandithModel.findOne({ _id: req.body.pandithId });
    //Validation
    if (!pandith) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    //success
    return res.status(200).json({
      success: true,
      message: "Pandith get by id successfully!",
      data: pandith,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

// ******** GET PANDITH APPOINTMENTS *****************/
export const getPandithPoojas = async (req, res) => {
  try {
    //Get pandith
    const pandith = await PandithModel.findOne({ userId: req.body.userId });
    if (!pandith) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found!",
      });
    }

    //Get poojas
    const pandithPoojas = await BookingModel.find({
      pandithId: pandith._id,
    })
      .populate("pandithInfo")
      .populate("userInfo");
    if (!pandithPoojas || pandithPoojas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No poojas found!",
      });
    }

    //Success
    return res.status(200).json({
      success: true,
      message: "Pandith Poojas Fetched Successfully!",
      data: pandithPoojas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

// ******** UPDATE APPOINTMENT STATUS *****************/
export const updatePoojaStatus = async (req, res) => {
  try {
    const { poojasId, status } = req.body;
    const poojas = await BookingModel.findByIdAndUpdate(poojasId, {
      status,
    });
    if (!poojas) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    //Push Notification to user (pooja approved ya reject)
    const user = await UserModel.findOne({ _id: poojas.userId });
    const unSeenNotifications = user.unSeenNotifications;
    unSeenNotifications.push({
      type: "status-updated",
      message: `Your Pooja has been ${status}`,
      onClickPath: "pandith-poojas",
    });
    await user.save();

    //Success
    return res.status(200).json({
      success: true,
      message: "Pooja status updated!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
