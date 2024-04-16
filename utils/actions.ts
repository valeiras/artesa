"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import {
  ArticleType,
  CreateAndEditArticleType,
  CreateAndEditSupplierType,
  SupplierType,
  createAndEditArticleSchema,
  createAndEditSupplierSchema,
} from "./types";
import { redirect } from "next/navigation";

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function createArticleAction(values: CreateAndEditArticleType): Promise<ArticleType | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const userId = authenticateAndRedirect();
  try {
    createAndEditArticleSchema.parse(values);
    const article: ArticleType = await prisma.article.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return article;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createSupplierAction(values: CreateAndEditSupplierType): Promise<SupplierType | null> {
  const userId = authenticateAndRedirect();
  try {
    createAndEditSupplierSchema.parse(values);
    const supplier: SupplierType = await prisma.supplier.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return supplier;
  } catch (error) {
    console.error(error);
    return null;
  }
}
