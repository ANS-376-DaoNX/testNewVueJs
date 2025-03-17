<template>
  <ProductTemplate
    v-model:searchForm="searchForm"
    :products="products"
    :current-product="currentProduct"
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

  defineComponent({
    name: 'ProductMaster'
  })

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
  const currentProduct = ref({})
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
    { code: '2002', name: 'セブン-イレブン・ジャパン', price: '90', trend: 'down' },
    { code: '2003', name: 'ローソン', price: '95', trend: '' }
  ])

  // Methods
  const searchUnit = async (keyword) => {
    console.log('Searching units with keyword:', keyword)
    unitList.value = await searchUnits(keyword || '')
    console.log('Unit list updated:', unitList.value)
  }

  const searchOrderPlace = async (keyword) => {
    console.log('Searching order places with keyword:', keyword)
    weightOrderPlaceList.value = await searchOrderPlaces(keyword || '')
    console.log('Weight order place list updated:', weightOrderPlaceList.value)
  }

  const searchMaker = async (keyword) => {
    console.log('Searching makers with keyword:', keyword)
    makerList.value = await searchMakers(keyword || '')
    console.log('Maker list updated:', makerList.value)
  }

  const searchWeightStandard = async (keyword) => {
    console.log('Searching weight standards with keyword:', keyword)
    weightStandardList.value = await searchWeightStandards(keyword || '')
    console.log('Weight standard list updated:', weightStandardList.value)
  }

  const searchProductsHandler = async () => {
    console.log('Searching products with form:', searchForm.value)
    products.value = await searchProducts(searchForm.value)
    console.log('Products updated:', products.value)
  }

  const resetForm = () => {
    searchForm.value = {
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
    }
  }

  // Setup JAN Code search
  const searchByJanCd = async (keyword) => {
    console.log('=== JAN Code search triggered with keyword:', keyword, ' ===')
    try {
      console.log('Calling searchJanCodes with keyword:', keyword || '')
      janCodeList.value = await searchJanCodes(keyword || '')
      console.log('JAN code list updated with length:', janCodeList.value?.length || 0)
      console.log('JAN code list updated with data:', janCodeList.value)

      // Force UI update
      setTimeout(() => {
        console.log('Forced UI update for JAN codes, current list length:', janCodeList.value?.length || 0)
      }, 100)
    } catch (error) {
      console.error('Error in searchByJanCd:', error)
      janCodeList.value = []
    }
  }

  // Select handlers for popups
  const selectJanCode = (item) => {
    searchForm.value.janCd = item.code
    searchForm.value.janCdName = item.name
  }

  const selectUnit = (item) => {
    searchForm.value.unit = item.code
    searchForm.value.unitName = item.name
  }

  const selectWeightOrderPlace = (item) => {
    searchForm.value.weightOrderPlace = item.code
    searchForm.value.weightOrderPlaceName = item.name
  }

  const selectMaker = (item) => {
    searchForm.value.makerCd = item.code
    searchForm.value.makerName = item.name
  }

  const selectWeightStandard = (item) => {
    searchForm.value.weightStandardCd = item.code
    searchForm.value.weightStandardName = item.name
  }

  // Initialize data
  onMounted(async () => {
    console.log('Product Master Component mounted, initializing data...')
    await initDb()

    console.log('Loading initial data for lists...')
    // Load initial data for all lists
    unitList.value = await searchUnits('')
    console.log('Initial unit list:', unitList.value)

    weightOrderPlaceList.value = await searchOrderPlaces('')
    console.log('Initial weight order place list:', weightOrderPlaceList.value)

    makerList.value = await searchMakers('')
    console.log('Initial maker list:', makerList.value)

    weightStandardList.value = await searchWeightStandards('')
    console.log('Initial weight standard list:', weightStandardList.value)

    janCodeList.value = await searchJanCodes('')
    console.log('Initial JAN code list:', janCodeList.value)

    console.log('Delivery group list (static):', deliveryGroupList.value)

    // Load initial products
    products.value = await searchProducts()
    console.log('Initial products:', products.value)
  })
</script>
