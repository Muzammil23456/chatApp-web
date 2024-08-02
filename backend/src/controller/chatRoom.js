import {ChatRoom} from "../model/chatRoom.js";

const startConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  const chatRoom = await ChatRoom.findOne({
    users: { $all: [senderId, receiverId] },
  }); // check if chat room already exists

  if (chatRoom) {
    return res.status(200).json({ chatRoomId: chatRoom._id });
  }
  const newChatRoom = new ChatRoom({
    users: [senderId, receiverId], // create new chat room with sender and receiver
  });
  await newChatRoom.save();
  return res.status(201).json({ chatRoomId: newChatRoom._id });
};

const getChatRoom = async (req, res) => {
    const chatRooms = await ChatRoom.find();
    return res.status(200).json({ chatRooms });
};

export { startConversation , getChatRoom};
