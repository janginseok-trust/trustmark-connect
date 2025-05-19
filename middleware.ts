import { NextResponse, type NextRequest } from 'next/server'

const BLOCKED_COUNTRIES = ['KP', 'IR', 'CU', 'SY']

export function middleware(request: NextRequest) {
  const country = (request as any).geo?.country || 'unknown'

  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse(
      JSON.stringify({ message: 'Access denied for your region.' }),
      { status: 403 }
    )
  }

  return NextResponse.next()
}
