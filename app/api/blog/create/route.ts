import { prisma } from '@/prisma/prisma';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

// Export a named function for POST requests
export async function POST(req: NextRequest) {
  // Get the current session to fetch the user
  const session = await auth()
  console.log({session})
  // If no session (user not logged in), return an unauthorized error
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
    
  const { title,description,thumbnail } = await req.json();

  // Create a new post
  const newPost = await prisma.post.create({
    data: {
      title,
      content:description,
      images:[thumbnail],
      authorId: session.user.id
    },
  });

  return NextResponse.json({status: 201, message: 'Post created successfully', data: newPost});
}
