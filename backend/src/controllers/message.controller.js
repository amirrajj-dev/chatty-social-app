import { usersModel } from "../models/user.model.js";
import { messageModel } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../utils/socket.io.js";

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
    }).populate([
      { path: "sender", select: "-password" },
      { path: "receiver", select: "-password" },
    ])

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

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const currentUser = req.user;
    let imagePath = '';

    if (req.file) {
      imagePath = `/messages/${req.file.filename}`;
    }

    const newMessage = await messageModel.create({
      sender: currentUser._id,
      receiver: receiverId,
      content: text,
      image: imagePath || null,
    });

    const populatedMessage = await newMessage.populate([
      { path: 'sender', select: '-password -__v' },
      { path: 'receiver', select: '-password -__v' }
    ]);

    // Realtime chat with socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', populatedMessage);
    }

    return res.status(201).json({
      message: 'Message sent successfully',
      success: true,
      data: populatedMessage,
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error, success: false });
  }
};