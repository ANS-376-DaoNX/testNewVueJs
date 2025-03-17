import { Low } from 'lowdb'

// Custom adapter using localStorage
class LocalStorageAdapter {
  constructor(key) {
    this.key = key
  }

  async read() {
    const data = localStorage.getItem(this.key)
    if (!data) {
      console.log('No data in localStorage, returning null')
      return null
    }
    console.log('Reading data from localStorage:', data)
    return JSON.parse(data)
  }

  async write(data) {
    console.log('Writing data to localStorage:', data)
    localStorage.setItem(this.key, JSON.stringify(data))
  }
}

// データベースの初期データ
const initialData = {
  units: [
    { id: 1, code: '001', name: 'ケース', description: '商品のケース単位' },
    { id: 2, code: '002', name: '個', description: '商品の個数単位' },
    { id: 3, code: '003', name: 'パック', description: 'パッケージ単位' },
    { id: 4, code: '004', name: 'ボックス', description: '箱単位' },
    { id: 5, code: '005', name: 'セット', description: 'セット単位' },
    { id: 6, code: '006', name: 'キログラム', description: '重量単位（kg）' },
    { id: 7, code: '007', name: 'グラム', description: '重量単位（g）' },
    { id: 8, code: '008', name: 'リットル', description: '容量単位（L）' },
    { id: 9, code: '009', name: 'ミリリットル', description: '容量単位（mL）' },
    { id: 10, code: '010', name: '袋', description: '袋単位' }
  ],
  makers: [
    { id: 1, code: 'M001', name: '山田製菓株式会社', address: '東京都千代田区' },
    { id: 2, code: 'M002', name: '東京フーズ株式会社', address: '東京都中央区' },
    { id: 3, code: 'M003', name: '大阪食品工業', address: '大阪府大阪市' },
    { id: 4, code: 'M004', name: '九州物産株式会社', address: '福岡県福岡市' },
    { id: 5, code: 'M005', name: '北海道乳業', address: '北海道札幌市' },
    { id: 6, code: 'M006', name: '名古屋食品株式会社', address: '愛知県名古屋市' },
    { id: 7, code: 'M007', name: '神戸洋菓子店', address: '兵庫県神戸市' },
    { id: 8, code: 'M008', name: '沖縄特産品株式会社', address: '沖縄県那覇市' },
    { id: 9, code: 'M009', name: '京都伝統食品株式会社', address: '京都府京都市' },
    { id: 10, code: 'M010', name: '横浜飲料株式会社', address: '神奈川県横浜市' }
  ],
  orderPlaces: [
    { id: 1, code: 'O001', name: '中央倉庫', address: '東京都大田区', contact: '03-1234-5678' },
    {
      id: 2,
      code: 'O002',
      name: '東京配送センター',
      address: '東京都江東区',
      contact: '03-2345-6789'
    },
    {
      id: 3,
      code: 'O003',
      name: '大阪物流センター',
      address: '大阪府大阪市',
      contact: '06-3456-7890'
    },
    { id: 4, code: 'O004', name: '福岡配送所', address: '福岡県福岡市', contact: '092-456-7891' },
    { id: 5, code: 'O005', name: '札幌倉庫', address: '北海道札幌市', contact: '011-567-8912' },
    {
      id: 6,
      code: 'O006',
      name: '名古屋配送センター',
      address: '愛知県名古屋市',
      contact: '052-678-9123'
    },
    {
      id: 7,
      code: 'O007',
      name: '横浜物流拠点',
      address: '神奈川県横浜市',
      contact: '045-789-1234'
    },
    { id: 8, code: 'O008', name: '神戸港倉庫', address: '兵庫県神戸市', contact: '078-891-2345' },
    {
      id: 9,
      code: 'O009',
      name: '仙台配送センター',
      address: '宮城県仙台市',
      contact: '022-912-3456'
    },
    {
      id: 10,
      code: 'O010',
      name: '広島物流拠点',
      address: '広島県広島市',
      contact: '082-123-4567'
    }
  ],
  weightStandards: [
    { id: 1, code: 'W001', name: '標準', description: '標準重量規格' },
    { id: 2, code: 'W002', name: '軽量', description: '軽量規格' },
    { id: 3, code: 'W003', name: '重量', description: '重量規格' },
    { id: 4, code: 'W004', name: '特殊', description: '特殊重量規格' },
    { id: 5, code: 'W005', name: 'その他', description: 'その他の重量規格' },
    { id: 6, code: 'W006', name: '超軽量', description: '超軽量規格' },
    { id: 7, code: 'W007', name: '超重量', description: '超重量規格' },
    { id: 8, code: 'W008', name: '小型', description: '小型商品用規格' },
    { id: 9, code: 'W009', name: '大型', description: '大型商品用規格' },
    { id: 10, code: 'W010', name: '精密', description: '精密測定用規格' }
  ],
  // JANコードデータ
  janCodes: [
    { id: 1, code: '4901234567890', name: 'テスト商品1 JAN', description: '菓子類' },
    { id: 2, code: '4901234567891', name: 'テスト商品2 JAN', description: '飲料' },
    { id: 3, code: '4901234567892', name: 'テスト商品3 JAN', description: '食品' },
    { id: 4, code: '4901234567893', name: 'テスト商品4 JAN', description: '日用品' },
    { id: 5, code: '4901234567894', name: 'テスト商品5 JAN', description: '文具' },
    { id: 6, code: '4901234567895', name: 'テスト商品6 JAN', description: '衣類' },
    { id: 7, code: '4901234567896', name: 'テスト商品7 JAN', description: '電化製品' },
    { id: 8, code: '4901234567897', name: 'テスト商品8 JAN', description: '玩具' },
    { id: 9, code: '4901234567898', name: 'テスト商品9 JAN', description: '化粧品' },
    { id: 10, code: '4901234567899', name: 'テスト商品10 JAN', description: '医薬品' }
  ],
  // 得意先データ
  customers: [
    {
      id: 1,
      code: '2001',
      name: 'イオン株式会社',
      address: '東京都千代田区',
      contact: '03-1111-2222'
    },
    {
      id: 2,
      code: '2002',
      name: 'セブン-イレブン・ジャパン',
      address: '東京都千代田区',
      contact: '03-2222-3333'
    },
    { id: 3, code: '2003', name: 'ローソン', address: '東京都品川区', contact: '03-3333-4444' },
    {
      id: 4,
      code: '2004',
      name: 'ファミリーマート',
      address: '東京都港区',
      contact: '03-4444-5555'
    },
    {
      id: 5,
      code: '2005',
      name: 'イトーヨーカドー',
      address: '東京都千代田区',
      contact: '03-5555-6666'
    },
    {
      id: 6,
      code: '2006',
      name: 'ヨドバシカメラ',
      address: '東京都新宿区',
      contact: '03-6666-7777'
    },
    { id: 7, code: '2007', name: 'ビックカメラ', address: '東京都豊島区', contact: '03-7777-8888' },
    { id: 8, code: '2008', name: 'ユニクロ', address: '山口県山口市', contact: '083-888-9999' },
    { id: 9, code: '2009', name: '無印良品', address: '東京都豊島区', contact: '03-9999-0000' },
    { id: 10, code: '2010', name: '東急ハンズ', address: '東京都渋谷区', contact: '03-0000-1111' }
  ],
  // 相手先データ
  persons: [
    { id: 1, code: 'P001', name: '山田太郎', department: '営業部', tel: '03-1234-5678' },
    { id: 2, code: 'P002', name: '鈴木一郎', department: '購買部', tel: '03-2345-6789' },
    { id: 3, code: 'P003', name: '田中花子', department: '物流部', tel: '03-3456-7890' },
    { id: 4, code: 'P004', name: '佐藤次郎', department: '経理部', tel: '03-4567-8901' },
    { id: 5, code: 'P005', name: '高橋三郎', department: '総務部', tel: '03-5678-9012' },
    { id: 6, code: 'P006', name: '伊藤四郎', department: '開発部', tel: '03-6789-0123' },
    { id: 7, code: 'P007', name: '渡辺五郎', department: '販売部', tel: '03-7890-1234' },
    { id: 8, code: 'P008', name: '小林六郎', department: 'マーケティング部', tel: '03-8901-2345' },
    { id: 9, code: 'P009', name: '加藤七子', department: '人事部', tel: '03-9012-3456' },
    { id: 10, code: 'P010', name: '松本八郎', department: '企画部', tel: '03-0123-4567' }
  ],
  // 部門データ
  departments: [
    { id: 1, code: 'D001', name: '食品部', manager: '山田太郎', budget: 10000000 },
    { id: 2, code: 'D002', name: '日用品部', manager: '鈴木一郎', budget: 8000000 },
    { id: 3, code: 'D003', name: '衣料品部', manager: '田中花子', budget: 12000000 },
    { id: 4, code: 'D004', name: '家電部', manager: '佐藤次郎', budget: 15000000 },
    { id: 5, code: 'D005', name: '玩具部', manager: '高橋三郎', budget: 6000000 },
    { id: 6, code: 'D006', name: '文具部', manager: '伊藤四郎', budget: 4000000 },
    { id: 7, code: 'D007', name: 'スポーツ用品部', manager: '渡辺五郎', budget: 9000000 },
    { id: 8, code: 'D008', name: '化粧品部', manager: '小林六郎', budget: 11000000 },
    { id: 9, code: 'D009', name: '医薬品部', manager: '加藤七子', budget: 13000000 },
    { id: 10, code: 'D010', name: 'インテリア部', manager: '松本八郎', budget: 7000000 }
  ],
  // 帳合データ
  mixCodes: [
    { id: 1, code: 'MIX001', name: '直接取引', description: '直接取引先との取引' },
    { id: 2, code: 'MIX002', name: '商社経由', description: '商社を介した取引' },
    { id: 3, code: 'MIX003', name: '代理店経由', description: '代理店を介した取引' },
    { id: 4, code: 'MIX004', name: '委託販売', description: '委託販売による取引' },
    { id: 5, code: 'MIX005', name: 'その他', description: 'その他の取引形態' },
    { id: 6, code: 'MIX006', name: '特約店経由', description: '特約店を介した取引' },
    {
      id: 7,
      code: 'MIX007',
      name: 'オンライン取引',
      description: 'オンラインプラットフォームでの取引'
    },
    { id: 8, code: 'MIX008', name: '卸売業者経由', description: '卸売業者を介した取引' },
    { id: 9, code: 'MIX009', name: '海外輸入', description: '海外からの輸入取引' },
    { id: 10, code: 'MIX010', name: '国内製造', description: '国内製造業者との直接取引' }
  ],
  // 配送グループデータ
  deliveryGroups: [
    { id: 1, code: 'DG001', name: '標準配送', description: '通常の配送グループ' },
    { id: 2, code: 'DG002', name: '急行配送', description: '急ぎの配送グループ' },
    { id: 3, code: 'DG003', name: '特別配送', description: '特別な配送グループ' },
    { id: 4, code: 'DG004', name: '定期配送', description: '定期的な配送グループ' },
    { id: 5, code: 'DG005', name: '大量配送', description: '大量注文用配送グループ' },
    { id: 6, code: 'DG006', name: '小口配送', description: '小口注文用配送グループ' },
    { id: 7, code: 'DG007', name: '冷蔵配送', description: '冷蔵品用配送グループ' },
    { id: 8, code: 'DG008', name: '冷凍配送', description: '冷凍品用配送グループ' },
    { id: 9, code: 'DG009', name: '海外配送', description: '海外向け配送グループ' },
    { id: 10, code: 'DG010', name: 'その他', description: 'その他の配送グループ' }
  ],
  // 会社部門データ
  companyDepartments: [
    { id: 1, code: 'CD001', name: '営業部', manager: '佐藤一郎', budget: 20000000 },
    { id: 2, code: 'CD002', name: '企画部', manager: '田中二郎', budget: 15000000 },
    { id: 3, code: 'CD003', name: '開発部', manager: '高橋三郎', budget: 30000000 },
    { id: 4, code: 'CD004', name: '人事部', manager: '伊藤四郎', budget: 10000000 },
    { id: 5, code: 'CD005', name: '総務部', manager: '渡辺五郎', budget: 8000000 },
    { id: 6, code: 'CD006', name: '経理部', manager: '山本六郎', budget: 12000000 },
    { id: 7, code: 'CD007', name: '物流部', manager: '中村七郎', budget: 18000000 },
    { id: 8, code: 'CD008', name: '購買部', manager: '小林八郎', budget: 22000000 },
    { id: 9, code: 'CD009', name: '国際部', manager: '加藤九郎', budget: 25000000 },
    { id: 10, code: 'CD010', name: '研究開発部', manager: '松本十郎', budget: 35000000 }
  ],
  // 会社分類データ
  companyClassifications: [
    { id: 1, code: 'CC001', name: '食品類', description: '食品関連製品' },
    { id: 2, code: 'CC002', name: '飲料類', description: '飲料関連製品' },
    { id: 3, code: 'CC003', name: '日用品', description: '日常生活用品' },
    { id: 4, code: 'CC004', name: '電化製品', description: '電気製品全般' },
    { id: 5, code: 'CC005', name: '衣料品', description: '衣類関連製品' },
    { id: 6, code: 'CC006', name: '文具', description: '文房具関連' },
    { id: 7, code: 'CC007', name: '玩具', description: '玩具関連製品' },
    { id: 8, code: 'CC008', name: '化粧品', description: '化粧品関連' },
    { id: 9, code: 'CC009', name: '医薬品', description: '医薬品関連' },
    { id: 10, code: 'CC010', name: 'その他', description: 'その他の製品' }
  ],
  // 温度帯データ
  temperatureZones: [
    { id: 1, code: 'TZ001', name: '常温', description: '常温で保管可能' },
    { id: 2, code: 'TZ002', name: '冷蔵', description: '冷蔵保管が必要' },
    { id: 3, code: 'TZ003', name: '冷凍', description: '冷凍保管が必要' },
    { id: 4, code: 'TZ004', name: '超冷凍', description: '-30℃以下での保管が必要' },
    { id: 5, code: 'TZ005', name: '温蔵', description: '温かい状態での保管が必要' },
    { id: 6, code: 'TZ006', name: '高温', description: '高温状態での保管が必要' },
    { id: 7, code: 'TZ007', name: '低湿', description: '低湿度環境での保管が必要' },
    { id: 8, code: 'TZ008', name: '高湿', description: '高湿度環境での保管が必要' },
    { id: 9, code: 'TZ009', name: '遮光', description: '光を避けた環境での保管が必要' },
    { id: 10, code: 'TZ010', name: 'その他', description: 'その他の特殊な保管条件' }
  ],
  // 在庫区分データ
  stockTypes: [
    { id: 1, code: 'ST001', name: '通常在庫', description: '通常の在庫管理対象' },
    { id: 2, code: 'ST002', name: '特別在庫', description: '特別な管理が必要な在庫' },
    { id: 3, code: 'ST003', name: '予約在庫', description: '予約販売用の在庫' },
    { id: 4, code: 'ST004', name: '展示在庫', description: '展示用の在庫' },
    { id: 5, code: 'ST005', name: '委託在庫', description: '委託販売用の在庫' },
    { id: 6, code: 'ST006', name: '不良在庫', description: '不良品の在庫' },
    { id: 7, code: 'ST007', name: '返品在庫', description: '返品された商品の在庫' },
    { id: 8, code: 'ST008', name: '仮在庫', description: '仮の在庫（確定前）' },
    { id: 9, code: 'ST009', name: '非在庫', description: '在庫管理対象外' },
    { id: 10, code: 'ST010', name: 'その他', description: 'その他の在庫区分' }
  ],
  // 商品データ
  products: [
    {
      id: 1,
      janCode: '4901234567890',
      productName: 'テスト商品1',
      unitCd: '001',
      makerCd: 'M001',
      weightOrderPlace: 'O001',
      weightStandardCd: 'W001',
      customerCode: '2001',
      personInCharge: 'P001',
      customerDepartment: 'D001',
      mixCode: 'MIX001',
      quantity: 10,
      orderPlace: 'O001',
      normalPurchasePrice: 100,
      specialPurchasePrice: 90,
      extraSpecialPurchasePrice: 80,
      normalDeliveryPrice: 120,
      specialDeliveryPrice: 110,
      extraSpecialDeliveryPrice: 100,
      normalCustomerPrice: 150,
      specialCustomerPrice: 140,
      extraSpecialCustomerPrice: 130,
      orderQuantity: 100,
      nonDisplay: false,
      separateDisplay: false,
      auctionPlace: '永井A',
      discontinued: false,
      reducedTaxRate: true,
      stockItem: true
    },
    {
      id: 2,
      janCode: '4901234567891',
      productName: 'テスト商品2',
      unitCd: '002',
      makerCd: 'M002',
      weightOrderPlace: 'O002',
      weightStandardCd: 'W002',
      customerCode: '2002',
      personInCharge: 'P002',
      customerDepartment: 'D002',
      mixCode: 'MIX002',
      quantity: 20,
      orderPlace: 'O002',
      normalPurchasePrice: 200,
      specialPurchasePrice: 180,
      extraSpecialPurchasePrice: 160,
      normalDeliveryPrice: 220,
      specialDeliveryPrice: 200,
      extraSpecialDeliveryPrice: 180,
      normalCustomerPrice: 250,
      specialCustomerPrice: 230,
      extraSpecialCustomerPrice: 210,
      orderQuantity: 200,
      nonDisplay: true,
      separateDisplay: true,
      auctionPlace: '永井B',
      discontinued: true,
      reducedTaxRate: false,
      stockItem: false
    },
    {
      id: 3,
      janCode: '4901234567892',
      productName: 'テスト商品3',
      unitCd: '003',
      makerCd: 'M003',
      weightOrderPlace: 'O003',
      weightStandardCd: 'W003',
      customerCode: '2003',
      personInCharge: 'P003',
      customerDepartment: 'D003',
      mixCode: 'MIX003',
      quantity: 30,
      orderPlace: 'O003',
      normalPurchasePrice: 300,
      specialPurchasePrice: 270,
      extraSpecialPurchasePrice: 240,
      normalDeliveryPrice: 330,
      specialDeliveryPrice: 300,
      extraSpecialDeliveryPrice: 270,
      normalCustomerPrice: 350,
      specialCustomerPrice: 320,
      extraSpecialCustomerPrice: 290,
      orderQuantity: 300,
      nonDisplay: false,
      separateDisplay: false,
      auctionPlace: 'センター',
      discontinued: false,
      reducedTaxRate: true,
      stockItem: true
    }
  ]
}

// Create database instance
const adapter = new LocalStorageAdapter('product-master-db')
const db = new Low(adapter, initialData)

// Initialize database with more debug information
export const initDb = async () => {
  try {
    console.log('Starting database initialization')
    await db.read()

    console.log('Checking database state:', db.data ? 'Data exists' : 'No data found')

    if (!db.data) {
      console.log('Initializing database with default data:', initialData)
      db.data = initialData
      await db.write()
      console.log('Database initialized with default data')
    } else {
      console.log('Database already initialized with data')
      // Make sure janCodes exists
      if (!db.data.janCodes) {
        console.log('Adding missing janCodes to database')
        db.data.janCodes = initialData.janCodes
        await db.write()
        console.log('Added janCodes to database')
      }
    }

    // Log the current state of the database
    console.log('Current database state:', {
      units: db.data.units?.length || 0,
      makers: db.data.makers?.length || 0,
      orderPlaces: db.data.orderPlaces?.length || 0,
      weightStandards: db.data.weightStandards?.length || 0,
      janCodes: db.data.janCodes?.length || 0,
      products: db.data.products?.length || 0
    })

    return db.data
  } catch (error) {
    console.error('Error initializing database:', error)
    // Fallback to initial data in case of error
    console.log('Using fallback data due to error')
    db.data = initialData
    return db.data
  }
}

// データベースのインスタンスをエクスポート
export default db
