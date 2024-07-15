import mongoose, { Schema } from "mongoose";

const chatRoomSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  calls: [{ type: Schema.Types.ObjectId, ref: "Call" }],
});

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
