import { defineStore } from 'pinia'
import ProductRepository from './repository'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null,
    customerPrices: [],
    loading: false,
    error: null,
    searchForm: {
      janCd: '',
      companyCd: '',
      productName: '',
      productNameKana: '',
      productShortName: '',
      specification: '',
      expiryDate: '',
      weightQuantity: '',
      unit: '',
      weightOrderPlace: '',
      makerCd: '',
      companyDeptCd: '',
      companyClassCd: '',
      weightStandardCd: '',
      deliveryGroup: '',
      stockType: '',
      temperatureZone: ''
    }
  }),

  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getCustomerPrices: (state) => state.customerPrices,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error,
    getSearchForm: (state) => state.searchForm
  },

  actions: {
    async fetchProducts(params) {
      this.loading = true
      try {
        const response = await ProductRepository.getProducts(params)
        this.products = response.data
        this.error = null
      } catch (error) {
        this.error = error.message || 'Failed to fetch products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      this.loading = true
      try {
        const response = await ProductRepository.getProductById(id)
        this.product = response.data
        this.error = null
      } catch (error) {
        this.error = error.message || 'Failed to fetch product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      this.loading = true
      try {
        const response = await ProductRepository.createProduct(productData)
        this.product = response.data
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to create product'
        console.error('Error creating product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      try {
        const response = await ProductRepository.updateProduct(id, productData)
        this.product = response.data
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to update product'
        console.error('Error updating product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      try {
        await ProductRepository.deleteProduct(id)
        this.products = this.products.filter((product) => product.id !== id)
        this.error = null
      } catch (error) {
        this.error = error.message || 'Failed to delete product'
        console.error('Error deleting product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchProducts(searchData) {
      this.loading = true
      try {
        const response = await ProductRepository.searchProducts(searchData)
        this.products = response.data
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to search products'
        console.error('Error searching products:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCustomerPrices(productId) {
      this.loading = true
      try {
        const response = await ProductRepository.getCustomerPrices(productId)
        this.customerPrices = response.data
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch customer prices'
        console.error('Error fetching customer prices:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    setSearchForm(formData) {
      this.searchForm = { ...formData }
    },

    resetSearchForm() {
      this.searchForm = {
        janCd: '',
        companyCd: '',
        productName: '',
        productNameKana: '',
        productShortName: '',
        specification: '',
        expiryDate: '',
        weightQuantity: '',
        unit: '',
        weightOrderPlace: '',
        makerCd: '',
        companyDeptCd: '',
        companyClassCd: '',
        weightStandardCd: '',
        deliveryGroup: '',
        stockType: '',
        temperatureZone: ''
      }
    },

    // Additional action for saving product
    async saveProduct(productData) {
      if (productData.id) {
        return this.updateProduct(productData.id, productData)
      } else {
        return this.createProduct(productData)
      }
    }
  }
})
