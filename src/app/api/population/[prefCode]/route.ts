import { NextResponse } from 'next/server'
import { getPopulation } from '@/lib/api-client'

interface Params {
  params: {
    prefCode: string
  }
}

export async function GET(req: Request, { params }: Params) {
  try {
    const prefCode = Number(params.prefCode)
    if (Number.isNaN(prefCode)) {
      return NextResponse.json({ error: '都道府県コードが無効です' }, { status: 400 })
    }

    // JSON を変数に保持
    const populationData = await getPopulation(prefCode)

    return NextResponse.json(populationData)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || '人口データ取得に失敗しました' },
      { status: 500 }
    )
  }
}