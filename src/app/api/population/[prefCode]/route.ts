import { NextResponse } from 'next/server'
import { getPopulation } from '@/lib/api-client'

export async function GET(
  _request: unknown, // 使用しない場合は _ を付ける
  context: { params: Promise<{ prefCode: string }> | { prefCode: string } }
) {
  const params = await context.params
  const prefCode = Number(params.prefCode)

  if (Number.isNaN(prefCode)) {
    return NextResponse.json({ error: '都道府県コードが無効です' }, { status: 400 })
  }

  try {
    const populationData = await getPopulation(prefCode)
    return NextResponse.json(populationData)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || '人口データ取得に失敗しました' },
      { status: 500 }
    )
  }
}
