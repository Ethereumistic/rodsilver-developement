import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body._type === 'product') {
      // Revalidate the home page and the product page
      revalidatePath('/');
      revalidatePath('/products/[slug]');
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }
    return NextResponse.json({ message: 'No action taken' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}