import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema(
    {
        type: { type: String },
        data: { url: { type: String, }, text: { type: String }, emoji: { type: String }, video: { type: String }, voice: { type: String } },
    },
    {
        timestamps: true,
    }
);

export const Content = mongoose.model("Content", contentSchema)