import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Stripe Webhook 처리 (실제 Stripe 검증 코드 필요)
  const body = await req.text()
  // 실제 검증 및 비즈니스 로직 구현 필요

  // 예시로 바로 성공 반환
  return NextResponse.json({ received: true })
}
