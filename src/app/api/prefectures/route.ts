import { NextResponse } from 'next/server'
import { getPrefectures } from '@/lib/api-client'

export async function GET(_request: unknown) {
  try {
    const data = await getPrefectures()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || '都道府県取得に失敗しました' },
      { status: 500 }
    )
  }
}
