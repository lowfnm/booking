import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const body = (await request.json()) as Record<string, string>

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return NextResponse.json({
    ok: true,
    data: body,
  })
}
