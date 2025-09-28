interface Region {
  color: string;
  prefectures: readonly string[];
}

export const regions: Record<string, Region> = {
  中国: {
    color: 'bg-sky-100',
    prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  },
  中部: {
    color: 'bg-red-100',
    prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  },
  九州沖縄: {
    color: 'bg-orange-100',
    prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
  },
  北海道: {
    color: 'bg-cyan-100',
    prefectures: ['北海道'],
  },
  四国: {
    color: 'bg-teal-100',
    prefectures: ['徳島県', '香川県', '愛媛県', '高知県'],
  },
  東北: {
    color: 'bg-lime-100',
    prefectures: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  },
  近畿: {
    color: 'bg-amber-100',
    prefectures: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  },
  関東: {
    color: 'bg-violet-100',
    prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  },
};

export function getRegionColor(prefName: string): string {
  for (const region of Object.values(regions)) {
    if (region.prefectures.includes(prefName)) {
      return region.color
    }
  }
  return 'bg-gray-100' // デフォルト
}