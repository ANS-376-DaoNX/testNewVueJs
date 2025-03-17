import repository from '@/utils/repository'

const resource = '/product'

export default {
  getProducts: (params) => {
    return repository.get(`${resource}`, { params })
  },
  getProductById: (id) => {
    return repository.get(`${resource}/${id}`)
  },
  createProduct: (data) => {
    return repository.post(`${resource}`, {
      ...data
    })
  },
  updateProduct: (id, data) => {
    return repository.put(`${resource}/${id}`, {
      ...data
    })
  },
  deleteProduct: (id) => {
    return repository.delete(`${resource}/${id}`)
  },
  searchProducts: (searchData) => {
    return repository.get(`${resource}/search`, { params: searchData })
  },
  getCustomerPrices: (productId) => {
    return repository.get(`${resource}/${productId}/customer-prices`)
  },
  // Additional methods for specific searches
  searchByJanCd: (janCd) => {
    return repository.get(`${resource}/search-by-jan`, { params: { janCd } })
  },
  searchUnit: (unit) => {
    return repository.get(`/units/search`, { params: { code: unit } })
  },
  searchWeightOrderPlace: (code) => {
    return repository.get(`/weight-order-places/search`, { params: { code } })
  },
  searchMakerCd: (code) => {
    return repository.get(`/makers/search`, { params: { code } })
  },
  searchWeightStandardCd: (code) => {
    return repository.get(`/weight-standards/search`, { params: { code } })
  }
}
