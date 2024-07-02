import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PandithModel from "../Models/PandithModel.js";
import BookingModel from "../Models/BookingModel.js";
import moment from "moment";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
   
    //Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }
    //Password validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
        success: false,
      });
    }

    //Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Register user
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json({
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//*************** USER LOGIN **********/
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    //Password Validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
        success: false,
      });
    }

    //Check user is exist or not
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }

    //Password match
    const comparePassword = await bcrypt.compare(password, getUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect Password, Please check again...",
        success: false,
      });
    }

    //Generate token
    const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    //Login success
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//********* GET USER INFO (FOR PROTECTED ROUTES) ******/
export const getUserInfo = async (req, res, next) => {
  try {
    //Get user
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists!",
        success: false,
      });
    }

    //Success response
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************* APPLY DOCTOR ACCOUNT **************/
export const applyPandith = async (req, res, next) => {
  try {
    //Add pandith
    console.log(req.body)
    const newPandith = new PandithModel(req.body);
    console.log(newPandith)
    await newPandith.save();

    //Get user (Admin)
    const getAdmin = await UserModel.findOne({ isAdmin: true });

    //Push notification to admin
    const unSeenNotifications = getAdmin.unSeenNotifications;
    unSeenNotifications.push({
      type: "new-pandith-request",
      message: `${newPandith.firstName} ${newPandith.lastName} has applied for a pandith account!`,
      data: {
        pandithId: newPandith._id,
        name: newPandith.firstName + " " + newPandith.lastName,
      },
      onClickPath: "/admin/Pandiths",
    });
    await UserModel.findByIdAndUpdate(getAdmin._id, { unSeenNotifications });

    //Response
    return res.status(201).json({
      message: "Pandith Account Applied Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ MARK ALL NOTIFICATIONS AS SEEN *******************/
export const markAllNotificationsAsSeen = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    const unSeenNotifications = user.unSeenNotifications;

    //Append unSeenNotifications to seenNotifications array
    user.seenNotifications.push(...unSeenNotifications);

    //Clear unSeenNotifications array
    user.unSeenNotifications = [];

    //Save the Updated user
    const updatedUser = await user.save();
    updatedUser.password = undefined; //Password hide
    return res.status(200).json({
      success: true,
      message: "All notifications marked as seen!",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ DELETE ALL SEEN NOTIFICATIONS *******************/
export const deleteAllSeenNotifications = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });

    //Clear the seenNotifications array
    user.seenNotifications = [];

    //Save the updated user
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "All seen notifications deleted!",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET ALL APPROVED DOCTORS ***********/
export const getAllApprovedPandiths = async (req, res) => {
  try {
    const pandiths = await PandithModel.find({ status: "approved" });
    if (!pandiths) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    //success res
    return res.status(200).json({
      success: true,
      message: "Pandith list fetched successfully!",
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

//************** BOOK APPOINTMENTS ***********/
export const bookingPooja = async (req, res) => {
  try {
    //Get data
    let { pandithId, userId, pandithInfo, userInfo, date, time, status } =
      req.body;
    if (!date || !time) {
      return res.status(422).json({
        success: false,
        message: "Please select date and time!",
      });
    }

    //Change date and time to ISO String (Used for convert date object to string obj) for check availability
    date = moment(date, "DD-MM-YYYY").toISOString();
    time = moment(time, "HH:mm").toISOString();
    status = "pending";

    //Add bookings
    const newBookings = new BookingModel({
      pandithId,
      userId,
      pandithInfo,
      userInfo,
      date,
      time,
      status,
    });
    await newBookings.save();

    //Push notification to user
    const user = await UserModel.findOne({ _id: req.body.pandithInfo.userId });
    user.unSeenNotifications.push({
      type: "New-Booking-Request",
      message: `A new pooja booking request from ${req.body.userInfo.name}`,
      onClickPath: "/user/poojas",
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Pooja booking successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** BOOK AVAILABILITY ***********/
export const bookingAvailability = async (req, res) => {
  try {
    const { pandithId, date, time } = req.body;
    const isoDate = moment(date, "DD-MM-YYYY").toISOString();
    const isoTime = moment(time, "HH:mm").toISOString();
    const fromTime = moment(isoTime).subtract(1, "hours").toISOString();
    const toTime = moment(isoTime).add(1, "hours").toISOString();

    const bookings = await BookingModel.find({
      pandithId,
      date: isoDate,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (bookings.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Pooja not available at this time",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Pooja available, you can book now!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET USER APPOINTMENTS ***********/
export const userPoojas = async (req, res) => {
  try {
    const poojas = await BookingModel.find({ userId: req.body.userId })
      .populate("userInfo")
      .populate("pandithInfo");
    if (!poojas) {
      return res.status(404).json({
        success: false,
        message: "No poojas found!",
      });
    }

    //Success res
    return res.status(200).json({
      success: true,
      message: "User Poojas Fetched Successfully!",
      data: poojas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
