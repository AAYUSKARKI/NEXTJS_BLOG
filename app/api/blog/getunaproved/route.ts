import { prisma } from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const posts = await prisma.post.findMany({where: {isApproved: false}});
  return NextResponse.json({status: 201, message: 'Post created successfully', data: posts});
}
