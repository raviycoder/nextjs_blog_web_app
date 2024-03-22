import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const { id } = params; 
    try {
      connectToDb();
      const post = await Post.findById(id);
      return NextResponse.json(post)
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch posts!");
    }
  };