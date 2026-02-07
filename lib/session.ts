import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET || "default-secret-key-change-me";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(
  userId: string,
  role: string,
  name: string,
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, name, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: session.role,
    name: session.name,
  };
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  // Cast to expected shape or return null
  if (!session) return null;
  return session as {
    userId: string;
    role: string;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
