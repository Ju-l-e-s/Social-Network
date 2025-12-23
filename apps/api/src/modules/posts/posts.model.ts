import { Schema, model } from "mongoose";

export interface PostDocument {
  _id: string;
  userId: string;
  message: string;
  imageUrl?: string;
  likes: number;
  usersLiked: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true, maxlength: 1500 },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const PostModel = model<PostDocument>("posts", postSchema);
