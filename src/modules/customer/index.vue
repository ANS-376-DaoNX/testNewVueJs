<template>
  <CustomerTemplate
    v-model:searchForm="searchForm"
    :customer-products="customerProducts"
    :is-editing="isEditing"
    :current-page="pagination.currentPage"
    :total-pages="pagination.totalPages"
    :customer-list="customerList"
    :person-list="personList"
    :department-list="departmentList"
    :mix-code-list="mixCodeList"
    :order-place-list="orderPlaceList"
    :jan-code-list="janCodeList"
    :field-errors="fieldErrors"
    @search-products="searchProductsHandler"
    @reset-form="resetForm"
    @search-customer="searchCustomersHandler"
    @select-customer="selectCustomerHandler"
    @search-department="searchDepartmentsHandler"
    @select-department="selectDepartmentHandler"
    @search-mix-code="searchMixCodesHandler"
    @select-mix-code="selectMixCodeHandler"
    @search-order-place="searchOrderPlacesHandler"
    @select-order-place="selectOrderPlaceHandler"
    @search-jan-code="searchJanCodesHandler"
    @select-jan-code="selectJanCodeHandler"
    @save-product="saveProductHandler"
    @clear-field-error="clearFieldError"
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
    searchProducts,
    searchJanCodes
  } from '@/services/masterDataService'
  import { useValidation } from '@/composables/useValidation'
  import './style.css'

  defineComponent({
    name: 'CustomerProductMaster'
  })

  // Use validation composable
  const { validate, fieldErrors, clearErrors, clearFieldError } = useValidation()

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
  const isEditing = ref(false)

  // Lists for search popups
  const customerList = ref([])
  const personList = ref([])
  const departmentList = ref([])
  const mixCodeList = ref([])
  const orderPlaceList = ref([])
  const janCodeList = ref([])

  // Computed properties
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  })

  // Validation schema for customer product form
  const customerProductValidationSchema = {
    janCode: [
      { rule: 'required', message: 'JANコードは必須項目です' },
      { rule: 'pattern', params: /^\d{13}$/, message: 'JANコードは13桁の数字で入力してください' }
    ],
    customerCode: [{ rule: 'required', message: '得意先コードは必須項目です' }],
    customerDepartment: [{ rule: 'required', message: '部署は必須項目です' }],
    mixCode: [{ rule: 'required', message: '仕入先は必須項目です' }],
    orderPlace: [{ rule: 'required', message: '発注先は必須項目です' }],
    normalPurchasePrice: [{ rule: 'number', message: '通常仕入価格は数値で入力してください' }],
    specialPurchasePrice: [{ rule: 'number', message: '特別仕入価格は数値で入力してください' }],
    extraSpecialPurchasePrice: [{ rule: 'number', message: '特特仕入価格は数値で入力してください' }],
    normalDeliveryPrice: [{ rule: 'number', message: '通常納入価格は数値で入力してください' }],
    specialDeliveryPrice: [{ rule: 'number', message: '特別納入価格は数値で入力してください' }],
    extraSpecialDeliveryPrice: [{ rule: 'number', message: '特特納入価格は数値で入力してください' }],
    normalCustomerPrice: [{ rule: 'number', message: '通常顧客価格は数値で入力してください' }],
    specialCustomerPrice: [{ rule: 'number', message: '特別顧客価格は数値で入力してください' }],
    extraSpecialCustomerPrice: [{ rule: 'number', message: '特特顧客価格は数値で入力してください' }],
    orderQuantity: [{ rule: 'positiveNumber', message: '発注数量は正の数値で入力してください' }],
    // Radio button validation
    auctionPlace: [{ rule: 'radioRequired', message: 'セリ場区分を選択してください' }],
    // Checkbox validations
    nonDisplay: [{ rule: 'checkboxRequired', message: '出荷表非表示をチェックしてください' }],
    separateDisplay: [{ rule: 'checkboxRequired', message: '出荷表非表示をチェックしてください' }],
    discontinued: [{ rule: 'checkboxRequired', message: '終売区分をチェックしてください' }],
    reducedTaxRate: [{ rule: 'checkboxRequired', message: '軽減税率をチェックしてください' }],
    stockItem: [{ rule: 'checkboxRequired', message: '在庫商品をチェックしてください' }]
  }

  // Search methods
  const searchProductsHandler = async () => {
    try {
      const results = await searchProducts(searchForm.value)
      customerProducts.value = results
      console.log('Customer products searched:', results.length)

      // Update pagination
      pagination.value.totalItems = results.length
      pagination.value.totalPages = Math.ceil(results.length / 10) || 1
    } catch (error) {
      console.error('Error searching customer products:', error)
    }
  }

  const resetForm = () => {
    // Reset search form
    for (const key in searchForm.value) {
      if (typeof searchForm.value[key] === 'boolean') {
        searchForm.value[key] = false
      } else {
        searchForm.value[key] = ''
      }
    }
    // Clear validation errors
    clearErrors()
  }

  // Search popup handlers
  const searchCustomersHandler = async (keyword) => {
    try {
      customerList.value = await searchCustomers(keyword)
      console.log('Customers searched:', customerList.value.length)
    } catch (error) {
      console.error('Error searching customers:', error)
    }
  }

  const searchDepartmentsHandler = async (keyword) => {
    try {
      departmentList.value = await searchDepartments(keyword)
      console.log('Departments searched:', departmentList.value.length)
    } catch (error) {
      console.error('Error searching departments:', error)
    }
  }

  const searchMixCodesHandler = async (keyword) => {
    try {
      mixCodeList.value = await searchMixCodes(keyword)
      console.log('Mix codes searched:', mixCodeList.value.length)
    } catch (error) {
      console.error('Error searching mix codes:', error)
    }
  }

  const searchOrderPlacesHandler = async (keyword) => {
    try {
      orderPlaceList.value = await searchOrderPlaces(keyword)
      console.log('Order places searched:', orderPlaceList.value.length)
    } catch (error) {
      console.error('Error searching order places:', error)
    }
  }

  const searchJanCodesHandler = async (keyword) => {
    try {
      janCodeList.value = await searchJanCodes(keyword)
      console.log('JAN codes searched:', janCodeList.value.length)
    } catch (error) {
      console.error('Error searching JAN codes:', error)
    }
  }

  // Select handlers for popups
  const selectCustomerHandler = (item) => {
    searchForm.value.customerCode = item.code
    searchForm.value.customerName = item.name
    clearFieldError('customerCode')
  }

  const selectDepartmentHandler = (item) => {
    searchForm.value.customerDepartment = item.code
    searchForm.value.departmentName = item.name
    clearFieldError('customerDepartment')
  }

  const selectMixCodeHandler = (item) => {
    searchForm.value.mixCode = item.code
    searchForm.value.mixCodeName = item.name
    clearFieldError('mixCode')
  }

  const selectOrderPlaceHandler = (item) => {
    searchForm.value.orderPlace = item.code
    searchForm.value.orderPlaceName = item.name
    clearFieldError('orderPlace')
  }

  const selectJanCodeHandler = (item) => {
    searchForm.value.janCode = item.code
    searchForm.value.janCodeName = item.name
    clearFieldError('janCode')
  }

  // Validation and save function
  const saveProductHandler = async () => {
    // Clear previous validation errors
    clearErrors()

    // Validate form
    const isValid = validate(searchForm.value, customerProductValidationSchema)

    if (isValid) {
      try {
        // Here you would save the customer product to your database
        console.log('Customer product saved successfully:', searchForm.value)

        // Reset form after successful save
        isEditing.value = false
        resetForm()

        // Refresh customer product list
        await searchProductsHandler()
      } catch (error) {
        console.error('Error saving customer product:', error)
      }
    }
  }

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

      janCodeList.value = await searchJanCodes('')
      console.log('Initial JAN code list loaded with length:', janCodeList.value?.length || 0)

      // Load initial products
      await searchProductsHandler()
      console.log('Initial products loaded with length:', customerProducts.value?.length || 0)
    } catch (error) {
      console.error('Error during initialization:', error)
    }
  })
</script>
