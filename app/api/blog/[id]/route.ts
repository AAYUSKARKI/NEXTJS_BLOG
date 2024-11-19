import { prisma } from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id)
    },
    include:{
      author:{
        select:{
          name:true,
          image:true
        }
      }
    }
  });
  return NextResponse.json({status: 200, message: 'Post fetched successfully', data: post});
}