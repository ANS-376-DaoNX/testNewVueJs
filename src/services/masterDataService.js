import db from '@/db/db.js'

// Helper function to handle missing data
const safelyReadData = async (dataKey) => {
  await db.read()

  if (!db.data || !db.data[dataKey]) {
    console.warn(`Data for ${dataKey} is missing!`, db.data)
    return []
  }

  console.log(`Retrieved ${db.data[dataKey].length} items for ${dataKey}`)
  return db.data[dataKey]
}

export const searchUnits = async (keyword = '') => {
  try {
    const units = await safelyReadData('units')
    console.log('Search units with keyword:', keyword, units)

    if (!keyword) return units

    const lowerKeyword = keyword.toLowerCase()
    return units.filter(
      (unit) => unit.code.toLowerCase().includes(lowerKeyword) || unit.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching units:', error)
    return []
  }
}

export const searchMakers = async (keyword = '') => {
  try {
    const makers = await safelyReadData('makers')
    console.log('Search makers with keyword:', keyword, makers)

    if (!keyword) return makers

    const lowerKeyword = keyword.toLowerCase()
    return makers.filter(
      (maker) => maker.code.toLowerCase().includes(lowerKeyword) || maker.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching makers:', error)
    return []
  }
}

export const searchOrderPlaces = async (keyword = '') => {
  try {
    const orderPlaces = await safelyReadData('orderPlaces')
    console.log('Search orderPlaces with keyword:', keyword, orderPlaces)

    if (!keyword) return orderPlaces

    const lowerKeyword = keyword.toLowerCase()
    return orderPlaces.filter(
      (place) => place.code.toLowerCase().includes(lowerKeyword) || place.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching orderPlaces:', error)
    return []
  }
}

export const searchWeightStandards = async (keyword = '') => {
  await db.read()
  const standards = db.data.weightStandards
  if (!keyword) return standards

  const lowerKeyword = keyword.toLowerCase()
  return standards.filter(
    (standard) =>
      standard.code.toLowerCase().includes(lowerKeyword) || standard.name.toLowerCase().includes(lowerKeyword)
  )
}

// 得意先の検索
export const searchCustomers = async (keyword = '') => {
  try {
    const customers = await safelyReadData('customers')
    console.log('Search customers with keyword:', keyword, customers)

    if (!keyword) return customers

    const lowerKeyword = keyword.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.code.toLowerCase().includes(lowerKeyword) || customer.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching customers:', error)
    return []
  }
}

// 相手先の検索
export const searchPersons = async (keyword = '') => {
  try {
    const persons = await safelyReadData('persons')
    console.log('Search persons with keyword:', keyword, persons)

    if (!keyword) return persons

    const lowerKeyword = keyword.toLowerCase()
    return persons.filter(
      (person) => person.code.toLowerCase().includes(lowerKeyword) || person.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching persons:', error)
    return []
  }
}

// 部門の検索
export const searchDepartments = async (keyword = '') => {
  try {
    const departments = await safelyReadData('departments')
    console.log('Search departments with keyword:', keyword, departments)

    if (!keyword) return departments

    const lowerKeyword = keyword.toLowerCase()
    return departments.filter(
      (department) =>
        department.code.toLowerCase().includes(lowerKeyword) || department.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching departments:', error)
    return []
  }
}

// 帳合の検索
export const searchMixCodes = async (keyword = '') => {
  try {
    const mixCodes = await safelyReadData('mixCodes')
    console.log('Search mixCodes with keyword:', keyword, mixCodes)

    if (!keyword) return mixCodes

    const lowerKeyword = keyword.toLowerCase()
    return mixCodes.filter(
      (mixCode) =>
        mixCode.code.toLowerCase().includes(lowerKeyword) || mixCode.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching mixCodes:', error)
    return []
  }
}

// 商品の検索
export const searchProducts = async (searchForm = {}) => {
  try {
    const products = await safelyReadData('products')
    console.log('Search products with form:', searchForm, products)

    if (!searchForm) return products

    return products.filter((product) => {
      // 各検索条件でフィルタリング
      if (searchForm.janCode && !product.janCode.includes(searchForm.janCode)) return false
      if (searchForm.productName && !product.productName.includes(searchForm.productName)) return false
      if (searchForm.customerCode && !product.customerCode.includes(searchForm.customerCode)) return false
      if (searchForm.personInCharge && !product.personInCharge.includes(searchForm.personInCharge)) return false
      if (searchForm.customerDepartment && !product.customerDepartment.includes(searchForm.customerDepartment))
        return false
      if (searchForm.mixCode && !product.mixCode.includes(searchForm.mixCode)) return false
      if (searchForm.orderPlace && !product.orderPlace.includes(searchForm.orderPlace)) return false

      return true
    })
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

// JANコードの検索
export const searchJanCodes = async (keyword = '') => {
  try {
    console.log('Searching JANCodes with keyword:', keyword)
    const janCodes = await safelyReadData('janCodes')
    console.log('Retrieved JAN codes:', janCodes)

    if (!janCodes || janCodes.length === 0) {
      console.warn('No JAN codes found in database')
      return []
    }

    if (!keyword) {
      console.log('Returning all JAN codes (no filter)')
      return janCodes
    }

    const lowerKeyword = keyword.toLowerCase()
    const filtered = janCodes.filter(
      (jan) =>
        jan.code.toLowerCase().includes(lowerKeyword) ||
        jan.name.toLowerCase().includes(lowerKeyword) ||
        (jan.description && jan.description.toLowerCase().includes(lowerKeyword))
    )

    console.log(`Found ${filtered.length} JAN codes matching "${keyword}"`)
    return filtered
  } catch (error) {
    console.error('Error searching JANCodes:', error)
    return []
  }
}

// 配送グループの検索
export const searchDeliveryGroups = async (keyword = '') => {
  try {
    const deliveryGroups = await safelyReadData('deliveryGroups')
    console.log('Search delivery groups with keyword:', keyword, deliveryGroups)

    if (!keyword) return deliveryGroups

    const lowerKeyword = keyword.toLowerCase()
    return deliveryGroups.filter(
      (group) => group.code.toLowerCase().includes(lowerKeyword) || group.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching delivery groups:', error)
    return []
  }
}

// 会社部門の検索
export const searchCompanyDepartments = async (keyword = '') => {
  try {
    const companyDepartments = await safelyReadData('companyDepartments')
    console.log('Search company departments with keyword:', keyword, companyDepartments)

    if (!keyword) return companyDepartments

    const lowerKeyword = keyword.toLowerCase()
    return companyDepartments.filter(
      (dept) => dept.code.toLowerCase().includes(lowerKeyword) || dept.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching company departments:', error)
    return []
  }
}

// 会社分類の検索
export const searchCompanyClassifications = async (keyword = '') => {
  try {
    const companyClassifications = await safelyReadData('companyClassifications')
    console.log('Search company classifications with keyword:', keyword, companyClassifications)

    if (!keyword) return companyClassifications

    const lowerKeyword = keyword.toLowerCase()
    return companyClassifications.filter(
      (classification) =>
        classification.code.toLowerCase().includes(lowerKeyword) ||
        classification.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching company classifications:', error)
    return []
  }
}

// 温度帯の検索
export const searchTemperatureZones = async (keyword = '') => {
  try {
    const temperatureZones = await safelyReadData('temperatureZones')
    console.log('Search temperature zones with keyword:', keyword, temperatureZones)

    if (!keyword) return temperatureZones

    const lowerKeyword = keyword.toLowerCase()
    return temperatureZones.filter(
      (zone) => zone.code.toLowerCase().includes(lowerKeyword) || zone.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching temperature zones:', error)
    return []
  }
}

// 在庫区分の検索
export const searchStockTypes = async (keyword = '') => {
  try {
    const stockTypes = await safelyReadData('stockTypes')
    console.log('Search stock types with keyword:', keyword, stockTypes)

    if (!keyword) return stockTypes

    const lowerKeyword = keyword.toLowerCase()
    return stockTypes.filter(
      (type) => type.code.toLowerCase().includes(lowerKeyword) || type.name.toLowerCase().includes(lowerKeyword)
    )
  } catch (error) {
    console.error('Error searching stock types:', error)
    return []
  }
}
