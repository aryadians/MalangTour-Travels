"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
// import bcrypt from "bcryptjs"; // bcryptjs handles imports differently in some environments, let's try direct require if import fails or standard import
import * as bcrypt from "bcryptjs";

const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Be at least 6 characters long." }),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function signup(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    },
  });

  // Create session
  await createSession(user.id, user.role, user.name || "");

  redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      errors: {
        email: ["Invalid credentials."], // Generic error for security
      },
      message: "Invalid credentials.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      errors: {
        email: ["Invalid credentials."],
      },
      message: "Invalid credentials.",
    };
  }

  await createSession(user.id, user.role, user.name || "");

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  } else {
    redirect("/");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}

export async function getMe() {
  const session = await getSession();
  if (!session || !session.userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true,
        referralCode: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
