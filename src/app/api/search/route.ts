import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()
    
    // TODO: Implement actual search logic
    // For now, return mock data with proper image paths
    const mockResults = [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile white t-shirt',
        price: 29.99,
        imageUrl: '/images/products/tops/tops_001_front.jpg',
        category: 'Tops',
        images: [
          '/images/products/tops/tops_001_front.jpg',
          '/images/products/tops/tops_001_back.jpg',
          '/images/products/tops/tops_001_detail.jpg'
        ]
      },
      {
        id: 2,
        name: 'Slim Fit Jeans',
        description: 'Modern slim fit jeans with stretch',
        price: 59.99,
        imageUrl: '/images/products/bottoms/bottoms_001_front.jpg',
        category: 'Bottoms',
        images: [
          '/images/products/bottoms/bottoms_001_front.jpg',
          '/images/products/bottoms/bottoms_001_back.jpg',
          '/images/products/bottoms/bottoms_001_detail.jpg'
        ]
      }
    ]

    return NextResponse.json({ results: mockResults })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    )
  }
} 