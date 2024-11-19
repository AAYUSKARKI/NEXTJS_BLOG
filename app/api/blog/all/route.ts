import { prisma } from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany();

    // Always return an array, even if empty
    const formattedPosts = Array.isArray(posts) ? posts : [posts];

    return NextResponse.json({
      status: 200,
      message: 'Posts fetched successfully',
      data: formattedPosts,
    });
  } catch (error:any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { status: 500, message: 'Failed to fetch posts', error: error.message },
      { status: 500 }
    );
  }
}
