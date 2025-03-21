<template>
  <ProductTemplate
    v-model:searchForm="searchForm"
    :products="products"
    :is-editing="isEditing"
    :current-page="currentPage"
    :total-pages="totalPages"
    :unit-list="unitList"
    :weight-order-place-list="weightOrderPlaceList"
    :maker-list="makerList"
    :weight-standard-list="weightStandardList"
    :jan-code-list="janCodeList"
    :delivery-group-list="deliveryGroupList"
    :customer-prices="customerPrices"
    :field-errors="fieldErrors"
    @search-products="searchProductsHandler"
    @reset-form="resetForm"
    @search-unit="searchUnit"
    @search-weight-order-place="searchOrderPlace"
    @search-maker-cd="searchMaker"
    @search-weight-standard-cd="searchWeightStandard"
    @search-by-jan-cd="searchByJanCd"
    @select-jan-code="selectJanCode"
    @select-unit="selectUnit"
    @select-weight-order-place="selectWeightOrderPlace"
    @select-maker="selectMaker"
    @select-weight-standard="selectWeightStandard"
    @save-product="saveProductHandler"
    @clear-field-error="clearFieldError"
  />
</template>

<script setup>
  import { ref, onMounted, defineComponent } from 'vue'
  import ProductTemplate from './template.vue'
  import { initDb } from '@/db/db.js'
  import {
    searchUnits,
    searchOrderPlaces,
    searchMakers,
    searchWeightStandards,
    searchProducts,
    searchJanCodes
  } from '@/services/masterDataService'
  import { useValidation } from '@/composables/useValidation'

  defineComponent({
    name: 'ProductMaster'
  })

  // Use validation composable
  const { validate, fieldErrors, clearErrors, clearFieldError } = useValidation()

  // State
  const searchForm = ref({
    janCd: '',
    janCdName: '',
    companyCd: '',
    productName: '',
    productNameKana: '',
    productShortName: '',
    specification: '',
    expiryDate: '',
    weightQuantity: '',
    unit: '',
    unitName: '',
    weightOrderPlace: '',
    weightOrderPlaceName: '',
    makerCd: '',
    makerName: '',
    companyDeptCd: '',
    companyClassCd: '',
    weightStandardCd: '',
    weightStandardName: '',
    deliveryGroup: '',
    stockType: '',
    temperatureZone: ''
  })

  const products = ref([])
  const isEditing = ref(false)
  const currentPage = ref(1)
  const totalPages = ref(1)

  // Lists for search popups
  const unitList = ref([])
  const weightOrderPlaceList = ref([])
  const makerList = ref([])
  const weightStandardList = ref([])
  const janCodeList = ref([])
  const deliveryGroupList = ref([
    { code: 'DG001', name: '標準配送' },
    { code: 'DG002', name: '急行配送' },
    { code: 'DG003', name: '特別配送' },
    { code: 'DG004', name: '定期配送' },
    { code: 'DG005', name: '大量配送' },
    { code: 'DG006', name: '小口配送' },
    { code: 'DG007', name: '冷蔵配送' },
    { code: 'DG008', name: '冷凍配送' },
    { code: 'DG009', name: '海外配送' },
    { code: 'DG010', name: 'その他' }
  ])
  const customerPrices = ref([
    { code: '2001', name: 'イオン株式会社', price: '100', trend: 'up' },
    { code: '2002', name: 'セブン＆アイ・ホールディングス', price: '200', trend: 'down' },
    { code: '2003', name: 'ファミリーマート', price: '150', trend: 'up' },
    { code: '2004', name: '株式会社ヨドバシカメラ', price: '300', trend: 'stable' },
    { code: '2005', name: '楽天株式会社', price: '180', trend: 'up' }
  ])

  // Validation schema for product form
  const productValidationSchema = {
    janCd: [
      { rule: 'required', message: 'JANCDは必須項目です' },
      { rule: 'pattern', params: /^\d{13}$/, message: 'JANCDは13桁の数字で入力してください' }
    ],
    companyCd: [
      { rule: 'required', message: '自社CDは必須項目です' },
      { rule: 'maxLength', params: { max: 10 }, message: '自社CDは10文字以内で入力してください' }
    ],
    productName: [
      { rule: 'required', message: '商品名は必須項目です' },
      { rule: 'maxLength', params: { max: 100 }, message: '商品名は100文字以内で入力してください' }
    ],
    productNameKana: [
      { rule: 'maxLength', params: { max: 100 }, message: '商品名カナは100文字以内で入力してください' }
    ],
    productShortName: [{ rule: 'maxLength', params: { max: 50 }, message: '商品略称は50文字以内で入力してください' }],
    specification: [{ rule: 'maxLength', params: { max: 100 }, message: '規格は100文字以内で入力してください' }],
    expiryDate: [{ rule: 'pattern', params: /^\d*$/, message: '賞味期限は数字で入力してください' }],
    weightQuantity: [{ rule: 'pattern', params: /^\d*(\.\d{1,2})?$/, message: '重量は数値で入力してください' }],
    unit: [{ rule: 'required', message: '単位は必須項目です' }],
    makerCd: [{ rule: 'required', message: 'メーカーCDは必須項目です' }]
  }

  // Search functions
  const searchProductsHandler = async () => {
    try {
      const results = await searchProducts(searchForm.value)
      products.value = results
      // More logic for pagination, etc.
      console.log('Products searched:', results.length)
    } catch (error) {
      console.error('Error searching products:', error)
    }
  }

  const resetForm = () => {
    // Reset search form
    for (const key in searchForm.value) {
      searchForm.value[key] = ''
    }
    // Clear validation errors
    clearErrors()
  }

  // Search popup handlers
  const searchUnit = async (keyword) => {
    try {
      unitList.value = await searchUnits(keyword)
      console.log('Units searched:', unitList.value.length)
    } catch (error) {
      console.error('Error searching units:', error)
    }
  }

  const searchOrderPlace = async (keyword) => {
    try {
      weightOrderPlaceList.value = await searchOrderPlaces(keyword)
      console.log('Order places searched:', weightOrderPlaceList.value.length)
    } catch (error) {
      console.error('Error searching order places:', error)
    }
  }

  const searchMaker = async (keyword) => {
    try {
      makerList.value = await searchMakers(keyword)
      console.log('Makers searched:', makerList.value.length)
    } catch (error) {
      console.error('Error searching makers:', error)
    }
  }

  const searchWeightStandard = async (keyword) => {
    try {
      weightStandardList.value = await searchWeightStandards(keyword)
      console.log('Weight standards searched:', weightStandardList.value.length)
    } catch (error) {
      console.error('Error searching weight standards:', error)
    }
  }

  const searchByJanCd = async (keyword) => {
    try {
      janCodeList.value = await searchJanCodes(keyword)
      console.log('JAN codes searched:', janCodeList.value.length)
    } catch (error) {
      console.error('Error searching JAN codes:', error)
    }
  }

  // Select handlers for popups
  const selectJanCode = (item) => {
    searchForm.value.janCd = item.code
    searchForm.value.janCdName = item.name
    clearFieldError('janCd')
  }

  const selectUnit = (item) => {
    searchForm.value.unit = item.code
    searchForm.value.unitName = item.name
    clearFieldError('unit')
  }

  const selectWeightOrderPlace = (item) => {
    searchForm.value.weightOrderPlace = item.code
    searchForm.value.weightOrderPlaceName = item.name
    clearFieldError('weightOrderPlace')
  }

  const selectMaker = (item) => {
    searchForm.value.makerCd = item.code
    searchForm.value.makerName = item.name
    clearFieldError('makerCd')
  }

  const selectWeightStandard = (item) => {
    searchForm.value.weightStandardCd = item.code
    searchForm.value.weightStandardName = item.name
    clearFieldError('weightStandardCd')
  }

  // Validation and save function
  const saveProductHandler = async () => {
    // Clear previous validation errors
    clearErrors()

    // Validate form
    const isValid = validate(searchForm.value, productValidationSchema)

    if (isValid) {
      try {
        // Here you would save the product to your database
        console.log('Product saved successfully:', searchForm.value)

        // Reset form after successful save
        isEditing.value = false
        resetForm()

        // Refresh product list
        await searchProductsHandler()
      } catch (error) {
        console.error('Error saving product:', error)
      }
    }
  }

  onMounted(async () => {
    console.log('Product Master Component mounted, initializing data...')
    await initDb()

    // Load initial data
    try {
      unitList.value = await searchUnits('')
      weightOrderPlaceList.value = await searchOrderPlaces('')
      makerList.value = await searchMakers('')
      weightStandardList.value = await searchWeightStandards('')

      // Load initial products
      await searchProductsHandler()
    } catch (error) {
      console.error('Error during initialization:', error)
    }
  })
</script>
