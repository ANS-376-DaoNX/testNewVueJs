<template>
  <CustomerTemplate
    v-model:searchForm="searchForm"
    :customer-products="customerProducts"
    :current-product="currentProduct"
    :is-editing="isEditing"
    :current-page="pagination.currentPage"
    :total-pages="pagination.totalPages"
    :customer-list="customerList"
    :department-list="departmentList"
    :mix-code-list="mixCodeList"
    :order-place-list="orderPlaceList"
    @search-products="searchProductsHandler"
    @reset-form="resetForm"
    @search-customer="searchCustomerHandler"
    @search-department="searchDepartmentHandler"
    @search-mix-code="searchMixCodeHandler"
    @search-order-place="searchOrderPlaceHandler"
    @select-customer="selectCustomerHandler"
    @select-department="selectDepartmentHandler"
    @select-mix-code="selectMixCodeHandler"
    @select-order-place="selectOrderPlaceHandler"
  />
</template>

<script setup>
  import { ref, onMounted, defineComponent } from 'vue'
  import CustomerTemplate from './template.vue'
  import { initDb } from '@/db/db.js'
  import {
    searchCustomers,
    searchDepartments,
    searchMixCodes,
    searchOrderPlaces,
    searchProducts
  } from '@/services/masterDataService'
  import './style.css'

  defineComponent({
    name: 'CustomerProductMaster'
  })

  // State
  const searchForm = ref({
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
    stockItem: false
  })

  const customerProducts = ref([])
  const currentProduct = ref({})
  const isEditing = ref(false)

  // Lists for search popups
  const customerList = ref([])
  const departmentList = ref([])
  const mixCodeList = ref([])
  const orderPlaceList = ref([])

  // Computed properties
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  })

  // Methods
  const searchCustomerHandler = async (keyword) => {
    console.log('Searching customers with keyword:', keyword)
    try {
      customerList.value = await searchCustomers(keyword || '')
      console.log('Customer list updated with length:', customerList.value?.length || 0)
      console.log('Customer list data:', customerList.value)
    } catch (error) {
      console.error('Error in searchCustomerHandler:', error)
      customerList.value = []
    }
  }

  const searchDepartmentHandler = async (keyword) => {
    console.log('Searching departments with keyword:', keyword)
    try {
      departmentList.value = await searchDepartments(keyword || '')
      console.log('Department list updated with length:', departmentList.value?.length || 0)
      console.log('Department list data:', departmentList.value)
    } catch (error) {
      console.error('Error in searchDepartmentHandler:', error)
      departmentList.value = []
    }
  }

  const searchMixCodeHandler = async (keyword) => {
    console.log('Searching mix codes with keyword:', keyword)
    try {
      mixCodeList.value = await searchMixCodes(keyword || '')
      console.log('Mix code list updated with length:', mixCodeList.value?.length || 0)
      console.log('Mix code list data:', mixCodeList.value)
    } catch (error) {
      console.error('Error in searchMixCodeHandler:', error)
      mixCodeList.value = []
    }
  }

  const searchOrderPlaceHandler = async (keyword) => {
    console.log('Searching order places with keyword:', keyword)
    try {
      orderPlaceList.value = await searchOrderPlaces(keyword || '')
      console.log('Order place list updated with length:', orderPlaceList.value?.length || 0)
      console.log('Order place list data:', orderPlaceList.value)
    } catch (error) {
      console.error('Error in searchOrderPlaceHandler:', error)
      orderPlaceList.value = []
    }
  }

  const searchProductsHandler = async () => {
    try {
      customerProducts.value = await searchProducts(searchForm.value)

      // Cập nhật thông tin phân trang sau khi tìm kiếm
      pagination.value = {
        currentPage: 1,
        totalPages: Math.ceil(customerProducts.value.length / 10),
        totalItems: customerProducts.value.length
      }
    } catch (error) {
      console.error('Error searching products:', error)
      customerProducts.value = []
    }
  }

  const resetForm = () => {
    searchForm.value = {
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
      stockItem: false
    }
  }

  // Initialize data
  onMounted(async () => {
    console.log('Customer Product Master Component mounted, initializing data...')
    await initDb()

    console.log('Loading initial data for lists...')
    try {
      // Load initial data for all lists
      customerList.value = await searchCustomers('')
      console.log('Initial customer list loaded with length:', customerList.value?.length || 0)

      departmentList.value = await searchDepartments('')
      console.log('Initial department list loaded with length:', departmentList.value?.length || 0)

      mixCodeList.value = await searchMixCodes('')
      console.log('Initial mix code list loaded with length:', mixCodeList.value?.length || 0)

      orderPlaceList.value = await searchOrderPlaces('')
      console.log('Initial order place list loaded with length:', orderPlaceList.value?.length || 0)

      // Force UI update for all lists
      setTimeout(() => {
        console.log('Forced UI update for all lists')
        console.log('Current lists lengths:', {
          customers: customerList.value?.length || 0,
          departments: departmentList.value?.length || 0,
          mixCodes: mixCodeList.value?.length || 0,
          orderPlaces: orderPlaceList.value?.length || 0
        })
      }, 100)

      // Load initial products
      await searchProductsHandler()
      console.log('Initial products loaded with length:', customerProducts.value?.length || 0)
    } catch (error) {
      console.error('Error during initialization:', error)
    }
  })

  // Select handlers for popups
  const selectCustomerHandler = (item) => {
    searchForm.value.customerCode = item.code
    searchForm.value.customerName = item.name
  }

  const selectDepartmentHandler = (item) => {
    searchForm.value.customerDepartment = item.code
    searchForm.value.departmentName = item.name
  }

  const selectMixCodeHandler = (item) => {
    searchForm.value.mixCode = item.code
    searchForm.value.mixCodeName = item.name
  }

  const selectOrderPlaceHandler = (item) => {
    searchForm.value.orderPlace = item.code
    searchForm.value.orderPlaceName = item.name
  }
</script>
