import { defineStore } from 'pinia'
import customerRepository from './repository'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    customerProducts: [],
    currentCustomer: null,
    currentCustomerProduct: null,
    loading: false,
    error: null,
    searchForm: {
      janCode: '',
      productName: '',
      customerCode: '',
      customerName: '',
      personInCharge: '',
      customerDepartment: '',
      departmentName: '',
      mixCode: '',
      mixCodeName: '',
      quantity: '',
      orderPlace: '',
      orderPlaceName: '',
      stockOrderType: '',
      storeOrderType: '',
      normalPurchasePrice: '',
      specialPurchasePrice: '',
      extraSpecialPurchasePrice: '',
      normalDeliveryPrice: '',
      specialDeliveryPrice: '',
      extraSpecialDeliveryPrice: '',
      normalCustomerPrice: '',
      specialCustomerPrice: '',
      extraSpecialCustomerPrice: '',
      orderQuantity: '',
      pieceOrder: '',
      scmLabel: '',
      nonDisplay: false,
      separateDisplay: false,
      auctionPlace: '',
      discontinued: false,
      reducedTaxRate: false,
      stockItem: false,
      page: 1,
      limit: 10
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  }),

  getters: {
    getCustomerById: (state) => (id) => {
      return state.customers.find((customer) => customer.id === id)
    },
    getCustomerProductById: (state) => (id) => {
      return state.customerProducts.find((product) => product.id === id)
    },
    hasSearchCriteria: (state) => {
      return (
        state.searchForm.janCode.trim() !== '' ||
        state.searchForm.productName.trim() !== '' ||
        state.searchForm.customerCode.trim() !== '' ||
        state.searchForm.personInCharge.trim() !== '' ||
        state.searchForm.customerDepartment.trim() !== '' ||
        state.searchForm.mixCode.trim() !== '' ||
        state.searchForm.quantity.trim() !== '' ||
        state.searchForm.orderPlace.trim() !== '' ||
        state.searchForm.orderQuantity.trim() !== '' ||
        state.searchForm.stockOrderType.trim() !== '' ||
        state.searchForm.storeOrderType.trim() !== '' ||
        state.searchForm.normalPurchasePrice.trim() !== '' ||
        state.searchForm.specialPurchasePrice.trim() !== '' ||
        state.searchForm.extraSpecialPurchasePrice.trim() !== '' ||
        state.searchForm.normalDeliveryPrice.trim() !== '' ||
        state.searchForm.specialDeliveryPrice.trim() !== '' ||
        state.searchForm.extraSpecialDeliveryPrice.trim() !== '' ||
        state.searchForm.normalCustomerPrice.trim() !== '' ||
        state.searchForm.specialCustomerPrice.trim() !== '' ||
        state.searchForm.extraSpecialCustomerPrice.trim() !== '' ||
        state.searchForm.pieceOrder.trim() !== '' ||
        state.searchForm.scmLabel.trim() !== '' ||
        state.searchForm.nonDisplay === true ||
        state.searchForm.separateDisplay === true ||
        state.searchForm.auctionPlace !== '' ||
        state.searchForm.discontinued === true ||
        state.searchForm.reducedTaxRate === true ||
        state.searchForm.stockItem === true
      )
    }
  },

  actions: {
    // Khách hàng
    async fetchCustomers() {
      try {
        this.loading = true
        const response = await customerRepository.getAll()
        this.customers = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể lấy danh sách khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCustomerById(id) {
      try {
        this.loading = true
        const response = await customerRepository.getById(id)
        this.currentCustomer = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể lấy thông tin khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCustomer(customer) {
      try {
        this.loading = true
        const response = await customerRepository.create(customer)
        this.customers.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể tạo khách hàng mới'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCustomer(id, customer) {
      try {
        this.loading = true
        const response = await customerRepository.update(id, customer)
        const index = this.customers.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.customers[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể cập nhật thông tin khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCustomer(id) {
      try {
        this.loading = true
        await customerRepository.delete(id)
        this.customers = this.customers.filter((c) => c.id !== id)
      } catch (error) {
        this.error = error.message || 'Không thể xóa khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Sản phẩm của khách hàng
    async fetchCustomerProducts(customerId) {
      try {
        this.loading = true
        const response = await customerRepository.getCustomerProducts(customerId)
        this.customerProducts = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể lấy danh sách sản phẩm của khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchCustomerProducts() {
      try {
        this.loading = true
        const params = {
          janCode: this.searchForm.janCode,
          productName: this.searchForm.productName,
          customerCode: this.searchForm.customerCode,
          customerName: this.searchForm.customerName,
          personInCharge: this.searchForm.personInCharge,
          customerDepartment: this.searchForm.customerDepartment,
          departmentName: this.searchForm.departmentName,
          mixCode: this.searchForm.mixCode,
          mixCodeName: this.searchForm.mixCodeName,
          quantity: this.searchForm.quantity,
          orderPlace: this.searchForm.orderPlace,
          orderPlaceName: this.searchForm.orderPlaceName,
          stockOrderType: this.searchForm.stockOrderType,
          storeOrderType: this.searchForm.storeOrderType,
          normalPurchasePrice: this.searchForm.normalPurchasePrice,
          specialPurchasePrice: this.searchForm.specialPurchasePrice,
          extraSpecialPurchasePrice: this.searchForm.extraSpecialPurchasePrice,
          normalDeliveryPrice: this.searchForm.normalDeliveryPrice,
          specialDeliveryPrice: this.searchForm.specialDeliveryPrice,
          extraSpecialDeliveryPrice: this.searchForm.extraSpecialDeliveryPrice,
          normalCustomerPrice: this.searchForm.normalCustomerPrice,
          specialCustomerPrice: this.searchForm.specialCustomerPrice,
          extraSpecialCustomerPrice: this.searchForm.extraSpecialCustomerPrice,
          orderQuantity: this.searchForm.orderQuantity,
          pieceOrder: this.searchForm.pieceOrder,
          scmLabel: this.searchForm.scmLabel,
          nonDisplay: this.searchForm.nonDisplay,
          separateDisplay: this.searchForm.separateDisplay,
          auctionPlace: this.searchForm.auctionPlace,
          discontinued: this.searchForm.discontinued,
          reducedTaxRate: this.searchForm.reducedTaxRate,
          stockItem: this.searchForm.stockItem,
          page: this.searchForm.page,
          limit: this.searchForm.limit
        }

        const response = await customerRepository.searchCustomerProducts(params)
        this.customerProducts = response.data.items || []

        // Cập nhật thông tin phân trang
        this.pagination.currentPage = response.data.currentPage || 1
        this.pagination.totalPages = response.data.totalPages || 1
        this.pagination.totalItems = response.data.totalItems || 0

        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể tìm kiếm sản phẩm của khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCustomerProduct(customerProduct) {
      try {
        this.loading = true
        const response = await customerRepository.createCustomerProduct(customerProduct)
        this.customerProducts.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể tạo sản phẩm mới cho khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCustomerProduct(id, customerProduct) {
      try {
        this.loading = true
        const response = await customerRepository.updateCustomerProduct(id, customerProduct)
        const index = this.customerProducts.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.customerProducts[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message || 'Không thể cập nhật thông tin sản phẩm của khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCustomerProduct(id) {
      try {
        this.loading = true
        await customerRepository.deleteCustomerProduct(id)
        this.customerProducts = this.customerProducts.filter((p) => p.id !== id)
      } catch (error) {
        this.error = error.message || 'Không thể xóa sản phẩm của khách hàng'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Quản lý form tìm kiếm
    setSearchForm(form) {
      this.searchForm = { ...this.searchForm, ...form }
    },

    resetSearchForm() {
      this.searchForm = {
        janCode: '',
        productName: '',
        customerCode: '',
        customerName: '',
        personInCharge: '',
        customerDepartment: '',
        departmentName: '',
        mixCode: '',
        mixCodeName: '',
        quantity: '',
        orderPlace: '',
        orderPlaceName: '',
        stockOrderType: '',
        storeOrderType: '',
        normalPurchasePrice: '',
        specialPurchasePrice: '',
        extraSpecialPurchasePrice: '',
        normalDeliveryPrice: '',
        specialDeliveryPrice: '',
        extraSpecialDeliveryPrice: '',
        normalCustomerPrice: '',
        specialCustomerPrice: '',
        extraSpecialCustomerPrice: '',
        orderQuantity: '',
        pieceOrder: '',
        scmLabel: '',
        nonDisplay: false,
        separateDisplay: false,
        auctionPlace: '',
        discontinued: false,
        reducedTaxRate: false,
        stockItem: false,
        page: 1,
        limit: 10
      }
    },

    setPage(page) {
      this.searchForm.page = page
    },

    // Quản lý sản phẩm hiện tại
    setCurrentCustomerProduct(product) {
      this.currentCustomerProduct = product
    },

    resetCurrentCustomerProduct() {
      this.currentCustomerProduct = {
        id: null,
        janCode: '',
        productName: '',
        customerCode: '',
        customerName: '',
        personInCharge: '',
        customerDepartment: '',
        departmentName: '',
        customerClassification: '',
        customerProductCode: '',
        customerProductName: '',
        customerPrice: 0,
        taxRate: 10,
        isActive: true,
        mixCode: '',
        mixCodeName: '',
        quantity: '',
        orderPlace: '',
        orderPlaceName: '',
        stockOrderType: '',
        storeOrderType: '',
        normalPurchasePrice: '',
        specialPurchasePrice: '',
        extraSpecialPurchasePrice: '',
        normalDeliveryPrice: '',
        specialDeliveryPrice: '',
        extraSpecialDeliveryPrice: '',
        normalCustomerPrice: '',
        specialCustomerPrice: '',
        extraSpecialCustomerPrice: '',
        orderQuantity: '',
        pieceOrder: '',
        scmLabel: '',
        nonDisplay: false,
        separateDisplay: false,
        auctionPlace: '',
        discontinued: false,
        reducedTaxRate: false,
        stockItem: false
      }
    },

    // Xử lý lỗi
    clearError() {
      this.error = null
    }
  }
})
