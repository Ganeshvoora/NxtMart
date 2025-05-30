// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch categories with associated products
    const categories = await prisma.category.findMany({
      include: {
        products: true,  // Include products for each category
      },
    });
    
    // Return the categories and their products
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}