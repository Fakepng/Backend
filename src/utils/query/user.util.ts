import prisma from "@/database/prisma.database";
import { Prisma } from "@prisma/client";

async function getUserById(id: string, select: Prisma.UserSelect) {
  return prisma.user.findUnique({
    where: {
      id: id,
      deletedAt: null,
    },
    select: select,
  });
}

async function getUserByEmail(email: string, select: Prisma.UserSelect) {
  return prisma.user.findUnique({
    where: {
      email: email,
      deletedAt: null,
    },
    select: select,
  });
}

async function createUser(data: {
  email: string;
  password: string;
  username: string;
}) {
  const existingUser = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          username: data.username,
        },
      ],
    },
  });

  if (existingUser.length > 0) {
    let toDeleteId = [];
    for (const user of existingUser) {
      if (user.isEmailVerified) {
        if (user.email === data.email) {
          return [null, "Email already exists"];
        }
        if (user.username === data.username) {
          return [null, "Username already exists"];
        }
      } else {
        toDeleteId.push(user.id);
      }
    }

    await prisma.user.deleteMany({
      where: {
        id: {
          in: toDeleteId,
        },
      },
    });
  }

  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
    },
  });
}

async function setEmailVerified(id: string, state: boolean) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      isEmailVerified: state,
    },
  });
}

export { getUserById, getUserByEmail, createUser, setEmailVerified };
