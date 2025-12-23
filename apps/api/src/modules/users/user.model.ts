import { Schema, model } from "mongoose";
import {
  defaultMemberPermissions,
  PermissionKey,
} from "@/modules/users/permissions";

export interface UserDocument {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  role: string;
  department: string;
  location: string;
  bio: string;
  skills: string[];
  avatarColor: string;
  avatarUrl?: string | null;
  permissions: PermissionKey[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: "Membre" },
    department: { type: String, default: "Produit" },
    location: { type: String, default: "Paris, FR" },
    bio: {
      type: String,
      default:
        "Engagé·e pour faire grandir la culture produit et le bien-être des équipes.",
    },
    skills: { type: [String], default: [] },
    avatarColor: { type: String, default: "#fb7185" },
    avatarUrl: { type: String },
    permissions: {
      type: [String],
      default: () => [...defaultMemberPermissions],
    },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>("users", userSchema);
