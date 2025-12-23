import bcrypt from "bcryptjs";
import { connectDatabase } from "@/config/database";
import { UserModel } from "@/modules/users/user.model";
import { PostModel } from "@/modules/posts/posts.model";
import { logger } from "@/lib/logger";
import {
  defaultAdminPermissions,
  defaultMemberPermissions,
} from "@/modules/users/permissions";

async function run() {
  await connectDatabase();
  logger.info("Seeding database...");

  await UserModel.deleteMany({});
  await PostModel.deleteMany({});

  const password = await bcrypt.hash("Test1234", 10);

  const users = await UserModel.insertMany([
    {
      firstName: "Camille",
      lastName: "Laurent",
      email: "camille@groupomania.com",
      password,
      isAdmin: true,
      role: "Product Design Lead",
      department: "Design Ops",
      location: "Paris, FR",
      skills: ["Design Ops", "Leadership", "Figma"],
      avatarColor: "#f97316",
      avatarUrl:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill,g_face,r_max/v1581009138/samples/people/kitchen-bar.jpg",
      permissions: defaultAdminPermissions,
    },
    {
      firstName: "Théo",
      lastName: "Nguyen",
      email: "theo@groupomania.com",
      password,
      role: "Engineering Manager",
      department: "Core Platform",
      location: "Lyon, FR",
      skills: ["Node.js", "DevRel", "MongoDB"],
      avatarColor: "#6366f1",
      permissions: defaultMemberPermissions,
    },
  ]);

  await PostModel.insertMany([
    {
      userId: users[0]._id,
      message:
        'Lancement du programme "Culture d\'équipe" : rituels de feedback, mentoring croisé et nouveaux templates Notion. On recrute des volontaires !',
      tags: ["#culture", "#designops"],
    },
    {
      userId: users[1]._id,
      message:
        "Nouvelle release backend : feed temps réel, file BullMQ pour les notifications, Sentry branché côté API ✅",
      tags: ["#release", "#backend"],
    },
  ]);

  logger.info("Seed terminé. Comptes dispo :");
  logger.info("Email: camille@groupomania.com | Password: Test1234");
  logger.info("Email: theo@groupomania.com | Password: Test1234");
  process.exit(0);
}

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
