process.env.API_BASE_URL = 'https://example.com'
process.env.X_API_KEY = 'dummy-key'

import { getPopulation, getPrefectures } from '@/lib/api-client'
import { type PopulationApiResponse, type PrefecturesApiResponse } from '@/types/api'

// -------------------------------
// テスト用型（message を optional に変更）
// -------------------------------
type TestPopulationApiResponse = Omit<PopulationApiResponse, 'message'> & {
  message?: string
}

type TestPrefecturesApiResponse = Omit<PrefecturesApiResponse, 'message'> & {
  message?: string
}

// モックデータ
const mockPopulationResponse: TestPopulationApiResponse = {
  message: undefined,
  result: {
    boundaryYear: 2020,
    data: [
      { data: [{
          rate: 0, value: 1000,
          year: 2020
      }], label: '総人口' },
    ],
  },
}

const mockPrefecturesResponse: TestPrefecturesApiResponse = {
  message: undefined,
  result: [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ],
}

beforeEach(() => {
  globalThis.fetch = jest.fn()
})

/* ---------------------------------- */
/* 正常系: データ取得成功 */
/* ---------------------------------- */
test('getPopulation は正常に人口データを返す', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => mockPopulationResponse,
    ok: true,
  })

  const data = await getPopulation(1)
  expect(data).toEqual(mockPopulationResponse)
})

test('getPrefectures は正常に都道府県データを返す', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => mockPrefecturesResponse,
    ok: true,
  })

  const data = await getPrefectures()
  expect(data).toEqual(mockPrefecturesResponse)
})

/* ---------------------------------- */
/* 異常系: ネットワークエラー・無効都道府県コード */
/* ---------------------------------- */
test('getPopulation は fetch が失敗した場合に例外を投げる', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })
  await expect(getPopulation(1)).rejects.toThrow('人口データの取得に失敗しました: 1')
})

test('getPrefectures は fetch が失敗した場合に例外を投げる', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })
  await expect(getPrefectures()).rejects.toThrow('都道府県データの取得に失敗しました')
})

/* ---------------------------------- */
/* 空配列や不完全データに対する挙動確認 */
/* ---------------------------------- */
test('getPopulation は result が空の場合も正しく返す', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => ({ message: undefined, result: undefined }),
    ok: true,
  })

  const data = await getPopulation(1)
  expect(data.result).toEqual({ boundaryYear: 0, data: [] })
})

test('getPrefectures は result が空の場合も正しく返す', async () => {
  ;(globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => ({ message: undefined, result: [] }),
    ok: true,
  })

  const data = await getPrefectures()
  expect(data.result).toEqual([])
})
