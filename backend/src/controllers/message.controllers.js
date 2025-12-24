import Usermodel from '../models/user.model.js';
import messageModel from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js'; // only if you’re using it

export const getUserforSlidebar = async (req, res) => {
  try {
    const logedinUser = req.user._id;
    const filteruser = await Usermodel.find({ _id: { $ne: logedinUser } }).select('-password');
    res.status(200).json(filteruser);
  } catch (error) {
    console.log("err in getUserforSlidebar", error.message);
    res.status(500).json({ message: "err in getUserforSlidebar", error: error.message });
  }
};

export const getmessage = async (req, res) => {
  const { id: UsertochatId } = req.params;
  const myid = req.user._id;

  try {
    const newMessage = await messageModel.find({
      $or: [
        { senderId: myid, recieverId: UsertochatId },
        { senderId: UsertochatId, recieverId: myid },
      ],
    });

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("err in getmessage", error.message);
    res.status(500).json({ message: "err in getmessage", error: error.message });
  }
};

export const sendmessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const myid = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image);
      imageUrl = imageUpload.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId: myid,
      recieverId,
      text,
      image: imageUrl,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("err in sendmessage", error.message);
    res.status(500).json({ message: "err in sendmessage", error: error.message });
  }
};
