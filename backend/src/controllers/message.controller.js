import { usersModel } from "../models/user.model.js";
import { messageModel } from "../models/message.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const currentUser = req.user;

    //get everyuser except the current user
    const users = await usersModel
      .find({ _id: { $ne: currentUser._id } })
      .select("-password");

    return res
      .status(200)
      .json({
        mesage: "users fetched successfully",
        success: true,
        data: users,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Error Fetching Users", success: false });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;
    const messages = await messageModel.find({
      $or: [
        { sender: currentUser._id, receiver: id },
        { sender: id, receiver: currentUser._id },
      ],
    });

    return res
      .status(200)
      .json({
        mesage: "Messages fetched successfully",
        success: true,
        data: messages,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Error fetching messages", success: false });
  }
};
