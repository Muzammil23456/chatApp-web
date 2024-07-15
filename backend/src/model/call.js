import mongoose, { Schema } from "mongoose";

const callSchema = new Schema(
  {
    caller: { type: Schema.Types.ObjectId, ref: "User" },
    callType: { type: String },
    callStatus: { type: String },
    chatRoom: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
    callStartTime: { type: Date },
    callEndTime: { type: Date },
  }
);

export const Call = mongoose.model("Call", callSchema);
