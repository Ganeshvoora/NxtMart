import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET handler to find product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Extract the ID from params
    const productId = params.id;

    // Find product by ID
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    // If product not found, return 404 error
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return product data
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}