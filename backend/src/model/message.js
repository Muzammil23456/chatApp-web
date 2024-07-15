import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type:Schema.Types.ObjectId, ref: "Content" },
        chatRoom: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
        edited: { type: Date },
        edit: {type: Boolean, default: false},
        deleted: {type: Boolean, default: false},
        status: { type: String, default: "sent" },
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);