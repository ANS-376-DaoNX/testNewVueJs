<template>
  <div class="product-master p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between bg-primary align-items-center text-white">
        <h5 class="mb-0">商品マスタ</h5>
      </div>
      <div class="card-body bg-light">
        <div class="search-form mb-4">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>JANCD</FormLabel>
                </div>
                <div class="col-md-4">
                  <NumberInput
                    :model-value="searchForm.janCode"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, janCode: value })"
                    placeholder="9090909090909"
                    :maxLength="13"
                    :allow-decimal="false"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>自社CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.companyCd"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, companyCd: value })"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>商品名</FormLabel>
                </div>
                <div class="col-md-10">
                  <BaseInput
                    :model-value="searchForm.productName"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, productName: value })"
                    placeholder="テスト商品"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>商品名カナ</FormLabel>
                </div>
                <div class="col-md-10">
                  <BaseInput
                    :model-value="searchForm.productNameKana"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, productNameKana: value })
                    "
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>商品略称</FormLabel>
                </div>
                <div class="col-md-10">
                  <BaseInput
                    :model-value="searchForm.productShortName"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, productShortName: value })
                    "
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>規格</FormLabel>
                </div>
                <div class="col-md-10">
                  <BaseInput
                    :model-value="searchForm.specification"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, specification: value })"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>賞味期限</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.expiryDate"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, expiryDate: value })"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>基本入数</FormLabel>
                </div>
                <div class="col-md-4">
                  <NumberInput
                    :model-value="searchForm.quantity"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, quantity: value })"
                    :allow-decimal="false"
                    :allow-negative="false"
                    :maxLength="10"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>単位</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.unit"
                      @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, unit: value })"
                      :items="unitList"
                      popup-title="単位検索"
                      @search="(keyword) => $emit('search-unit', keyword)"
                      @select="(item) => $emit('select-unit', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.unitName" disabled />
                  </div>
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>基本発注先</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.weightOrderPlace"
                      @update:model-value="
                        (value) => $emit('update:searchForm', { ...searchForm, weightOrderPlace: value })
                      "
                      :items="weightOrderPlaceList"
                      popup-title="発注先検索"
                      @search="(keyword) => $emit('search-weight-order-place', keyword)"
                      @select="(item) => $emit('select-weight-order-place', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.weightOrderPlaceName" disabled />
                  </div>
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>メーカーCD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.makerCd"
                      @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, makerCd: value })"
                      :items="makerList"
                      popup-title="メーカー検索"
                      @search="(keyword) => $emit('search-maker-cd', keyword)"
                      @select="(item) => $emit('select-maker', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.makerName" disabled />
                  </div>
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>自社部門CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.companyDeptCd"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, companyDeptCd: value })"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>自社分類CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.companyClassCd"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, companyClassCd: value })
                    "
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>基本帳合CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.weightStandardCd"
                      @update:model-value="
                        (value) => $emit('update:searchForm', { ...searchForm, weightStandardCd: value })
                      "
                      :items="weightStandardList"
                      popup-title="基本帳合検索"
                      @search="(keyword) => $emit('search-weight-standard-cd', keyword)"
                      @select="(item) => $emit('select-weight-standard', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.weightStandardName" disabled />
                  </div>
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>配送グループ</FormLabel>
                </div>
                <div class="col-md-4">
                  <SelectInput
                    :model-value="searchForm.deliveryGroup"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, deliveryGroup: value })"
                    :items="deliveryGroupList"
                    placeholder="配送グループを選択"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>在庫区分</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.stockType"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, stockType: value })"
                    placeholder="0:通常 1:在庫"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>温度帯</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.temperatureZone"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, temperatureZone: value })
                    "
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>単価</FormLabel>
                </div>
                <div class="col-md-4">
                  <NumberInput
                    :model-value="searchForm.price"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, price: value })"
                    :allow-decimal="true"
                    :allow-negative="true"
                    :decimal-places="2"
                    :maxLength="4"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="customer-price-section mb-4">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead class="table-light">
                    <tr>
                      <th class="table-danger text-dark" style="width: 30%" colspan="2">得意先CD</th>
                      <th class="table-info text-dark" style="width: 65%">仕入通常単価</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(customer, index) in customerPrices" :key="index">
                      <td>
                        <a
                          href="#"
                          class="text-primary text-decoration-none"
                          @click.prevent="viewCustomerDetails(customer.code)"
                          >{{ customer.code }}</a
                        >
                      </td>
                      <td>{{ customer.name }}</td>
                      <td class="text-end">
                        {{ customer.price }}
                        <i v-if="customer.trend === 'up'" class="bi bi-triangle-fill text-danger"></i>
                        <i
                          v-if="customer.trend === 'down'"
                          class="bi bi-triangle-fill text-danger"
                          style="transform: rotate(180deg)"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button class="btn btn-primary me-2" @click="saveProduct"><i class="bi bi-save me-1"></i>登録</button>
          <button class="btn btn-secondary" @click="closeForm"><i class="bi bi-x-circle me-1"></i>CLOSE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SearchInput from '@/components/common/SearchInput.vue'
  import BaseInput from '@/components/common/BaseInput.vue'
  import FormLabel from '@/components/common/FormLabel.vue'
  import SelectInput from '@/components/common/SelectInput.vue'
  import NumberInput from '@/components/common/NumberInput.vue'

  defineProps({
    searchForm: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      default: () => []
    },
    currentProduct: {
      type: Object,
      default: () => ({})
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    unitList: {
      type: Array,
      default: () => []
    },
    weightOrderPlaceList: {
      type: Array,
      default: () => []
    },
    makerList: {
      type: Array,
      default: () => []
    },
    weightStandardList: {
      type: Array,
      default: () => []
    },
    janCodeList: {
      type: Array,
      default: () => []
    },
    deliveryGroupList: {
      type: Array,
      default: () => []
    },
    customerPrices: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits([
    'update:searchForm',
    'search-by-jan-cd',
    'search-unit',
    'select-unit',
    'search-weight-order-place',
    'select-weight-order-place',
    'search-maker-cd',
    'select-maker',
    'search-weight-standard-cd',
    'select-weight-standard',
    'view-customer-details',
    'save-product',
    'close-form'
  ])

  const viewCustomerDetails = (code) => {
    emit('view-customer-details', code)
  }

  const saveProduct = () => {
    emit('save-product')
  }

  const closeForm = () => {
    emit('close-form')
  }
</script>
