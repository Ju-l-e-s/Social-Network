import { PostModel } from "@/modules/posts/posts.model";
import { UserModel } from "@/modules/users/user.model";
import { z } from "zod";

export const createPostSchema = z.object({
  userId: z.string(),
  message: z.string().min(1).max(1500),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
});

export async function listPosts() {
  const posts = await PostModel.find().sort({ createdAt: -1 }).lean();
  const userIds = posts.map((post) => post.userId);
  const users = await UserModel.find({ _id: { $in: userIds } })
    .select("firstName lastName role department avatarColor avatarUrl")
    .lean();
  const usersMap = new Map(users.map((user) => [String(user._id), user]));
  return posts.map((post) => {
    const author = usersMap.get(post.userId);
    return {
      id: post._id,
      message: post.message,
      imageUrl: post.imageUrl,
      likes: post.likes,
      reactions: [],
      createdAt: post.createdAt,
      tags: post.tags ?? [],
      author: author
        ? {
            firstName: author.firstName,
            lastName: author.lastName,
            role: author.role,
            avatarColor: author.avatarColor,
            avatarUrl: author.avatarUrl ?? null,
          }
        : {
            firstName: "Collaborateur",
            lastName: "",
            role: "Groupomania",
            avatarColor: "#94a3b8",
            avatarUrl: null,
          },
    };
  });
}

export async function createPost(input: z.infer<typeof createPostSchema>) {
  const payload = createPostSchema.parse(input);
  const post = await PostModel.create({
    ...payload,
    tags: payload.tags ?? [],
  });
  const author = await UserModel.findById(payload.userId)
    .select("firstName lastName role avatarColor")
    .lean();
  return {
    id: post._id,
    message: post.message,
    imageUrl: post.imageUrl,
    likes: post.likes,
    reactions: [],
    createdAt: post.createdAt,
    tags: post.tags ?? [],
    author: author
      ? {
          firstName: author.firstName,
          lastName: author.lastName,
          role: author.role,
          avatarColor: author.avatarColor,
          avatarUrl: author.avatarUrl ?? null,
        }
      : {
          firstName: "Collaborateur",
          lastName: "",
          role: "Groupomania",
          avatarColor: "#94a3b8",
          avatarUrl: null,
        },
  };
}
