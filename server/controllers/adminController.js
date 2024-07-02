import PandithModel from "../Models/PandithModel.js";
import UserModel from "../Models/UserModel.js";

//************* GET ALL USER **********/
export const getAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, { password: 0 }); //Hide password field

    //Success res
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//**************** GET ALL PANDITHS *************/
export const getAllPandith = async (req, res, next) => {
  try {
    const pandiths = await PandithModel.find({});

    //Success Res
    return res.status(200).json({
      success: true,
      data: pandiths,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* CHANGE ACCOUNT STATUS (PANDITH ACCOUNT) ********/
export const changeAccountStatus = async (req, res) => {
  try {
    const { pandithId, status } = req.body;

    const pandith = await PandithModel.findByIdAndUpdate(pandithId, { status });
    if (!pandith) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    const user = await UserModel.findOne({ _id: pandith.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const unSeenNotifications = user.unSeenNotifications;

    //Push notification
    unSeenNotifications.push({
      type: "pandith-account-request-updated",
      message: `Your pandith account request has ${status}.`,
      onclickPath: "/notifications",
    });
    user.isPandith = status === "approved" ? true : false;
    user.save();

    //Success res
    return res.status(201).json({
      success: true,
      message: "Account status updated!",
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
