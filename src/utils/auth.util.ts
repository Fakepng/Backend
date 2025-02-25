import jwt from "jsonwebtoken";

async function generateToken(email: string, username: string) {
  const [accessToken, refreshToken] = await generate(email, username);

  return { accessToken, refreshToken };
}

async function verifyToken(token: string, isRefresh = false) {
  try {
    const secret = isRefresh
      ? process.env.JWT_REFRESH_SECRET!
      : process.env.JWT_ACCESS_SECRET!;

    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    return null;
  }
}

async function generate(email: string, username: string) {
  const accessToken = jwt.sign(
    {
      email,
      username,
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "24h",
      algorithm: "HS256",
    }
  );

  const refreshToken = jwt.sign(
    {
      email,
      username,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );

  return [accessToken, refreshToken];
}

export { generateToken, verifyToken };
