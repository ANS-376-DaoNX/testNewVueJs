<template>
  <div class="customer-product-master p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h5 class="mb-0">得意先商品マスタ</h5>
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
                  <FormLabel>得意先CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.customerCode"
                      @update:model-value="
                        (value) => $emit('update:searchForm', { ...searchForm, customerCode: value })
                      "
                      placeholder="2001"
                      :items="customerList"
                      popup-title="得意先検索"
                      @search="(keyword) => $emit('search-customer', keyword)"
                      @select="(item) => $emit('select-customer', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.customerName" disabled />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>相手先CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.personInCharge"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, personInCharge: value })
                    "
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>相手先部門CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.customerDepartment"
                      @update:model-value="
                        (value) => $emit('update:searchForm', { ...searchForm, customerDepartment: value })
                      "
                      :items="departmentList"
                      popup-title="部門検索"
                      @search="(keyword) => $emit('search-department', keyword)"
                      @select="(item) => $emit('select-department', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.departmentName" disabled />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>帳合CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.mixCode"
                      @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, mixCode: value })"
                      :items="mixCodeList"
                      popup-title="帳合検索"
                      @search="(keyword) => $emit('search-mix-code', keyword)"
                      @select="(item) => $emit('select-mix-code', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.mixCodeName" disabled />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>入数</FormLabel>
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
                  <FormLabel>発注先CD</FormLabel>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <SearchInput
                      :model-value="searchForm.orderPlace"
                      @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, orderPlace: value })"
                      :items="orderPlaceList"
                      popup-title="発注先検索"
                      @search="(keyword) => $emit('search-order-place', keyword)"
                      @select="(item) => $emit('select-order-place', item)"
                    />
                    <input type="text" class="form-control" :value="searchForm.orderPlaceName" disabled />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>在庫発注区分</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.stockOrderType"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, stockOrderType: value })
                    "
                    placeholder="0:発注する 1:発注しない"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>店別発注区分</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.storeOrderType"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, storeOrderType: value })
                    "
                    placeholder="0:NO 1:YES"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2"></div>
                <div class="col-md-3">
                  <FormLabel class="text-center">通常単価</FormLabel>
                </div>
                <div class="col-md-3">
                  <FormLabel class="text-center">特売単価</FormLabel>
                </div>
                <div class="col-md-3">
                  <FormLabel class="text-center">特々単価</FormLabel>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>仕入</FormLabel>
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.normalPurchasePrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, normalPurchasePrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.specialPurchasePrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, specialPurchasePrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.extraSpecialPurchasePrice"
                    @update:model-value="
                      (value) =>
                        $emit('update:searchForm', {
                          ...searchForm,
                          extraSpecialPurchasePrice: value
                        })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>納品</FormLabel>
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.normalDeliveryPrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, normalDeliveryPrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.specialDeliveryPrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, specialDeliveryPrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.extraSpecialDeliveryPrice"
                    @update:model-value="
                      (value) =>
                        $emit('update:searchForm', {
                          ...searchForm,
                          extraSpecialDeliveryPrice: value
                        })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>得販</FormLabel>
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.normalCustomerPrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, normalCustomerPrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.specialCustomerPrice"
                    @update:model-value="
                      (value) => $emit('update:searchForm', { ...searchForm, specialCustomerPrice: value })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
                <div class="col-md-3">
                  <NumberInput
                    :model-value="searchForm.extraSpecialCustomerPrice"
                    @update:model-value="
                      (value) =>
                        $emit('update:searchForm', {
                          ...searchForm,
                          extraSpecialCustomerPrice: value
                        })
                    "
                    class="text-end"
                    :allow-decimal="true"
                    :decimal-places="2"
                    :allow-negative="false"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>ピース受注</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.pieceOrder"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, pieceOrder: value })"
                    placeholder="0:NO 1:YES"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>発注入数</FormLabel>
                </div>
                <div class="col-md-4">
                  <NumberInput
                    :model-value="searchForm.orderQuantity"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, orderQuantity: value })"
                    :allow-decimal="false"
                    :allow-negative="false"
                    :maxLength="10"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>出荷表非表示</FormLabel>
                </div>
                <div class="col-md-10">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="nonDisplay"
                      :checked="searchForm.nonDisplay"
                      @change="
                        $emit('update:searchForm', {
                          ...searchForm,
                          nonDisplay: $event.target.checked
                        })
                      "
                    />
                    <label class="form-check-label" for="nonDisplay">非表示</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="separateDisplay"
                      :checked="searchForm.separateDisplay"
                      @change="
                        $emit('update:searchForm', {
                          ...searchForm,
                          separateDisplay: $event.target.checked
                        })
                      "
                    />
                    <label class="form-check-label" for="separateDisplay">別表示</label>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>SCMラベル</FormLabel>
                </div>
                <div class="col-md-4">
                  <BaseInput
                    :model-value="searchForm.scmLabel"
                    @update:model-value="(value) => $emit('update:searchForm', { ...searchForm, scmLabel: value })"
                    placeholder="0:出力 1:しない"
                  />
                </div>
                <div class="col-md-6"></div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>セリ場区分</FormLabel>
                </div>
                <div class="col-md-10">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="auctionPlace"
                      id="nagaiA"
                      :checked="searchForm.auctionPlace === '永井A'"
                      @change="$emit('update:searchForm', { ...searchForm, auctionPlace: '永井A' })"
                    />
                    <label class="form-check-label" for="nagaiA">永井正A</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="auctionPlace"
                      id="nagaiB"
                      :checked="searchForm.auctionPlace === '永井B'"
                      @change="$emit('update:searchForm', { ...searchForm, auctionPlace: '永井B' })"
                    />
                    <label class="form-check-label" for="nagaiB">永井正B</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="auctionPlace"
                      id="center"
                      :checked="searchForm.auctionPlace === 'センター'"
                      @change="$emit('update:searchForm', { ...searchForm, auctionPlace: 'センター' })"
                    />
                    <label class="form-check-label" for="center">センター(昼市)</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="auctionPlace"
                      id="none"
                      :checked="searchForm.auctionPlace === 'なし'"
                      @change="$emit('update:searchForm', { ...searchForm, auctionPlace: 'なし' })"
                    />
                    <label class="form-check-label" for="none">なし</label>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>終売区分</FormLabel>
                </div>
                <div class="col-md-10">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="discontinued"
                      :checked="searchForm.discontinued"
                      @change="
                        $emit('update:searchForm', {
                          ...searchForm,
                          discontinued: $event.target.checked
                        })
                      "
                    />
                    <label class="form-check-label" for="discontinued">終売</label>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>軽減税率</FormLabel>
                </div>
                <div class="col-md-10">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="reducedTaxRate"
                      :checked="searchForm.reducedTaxRate"
                      @change="
                        $emit('update:searchForm', {
                          ...searchForm,
                          reducedTaxRate: $event.target.checked
                        })
                      "
                    />
                    <label class="form-check-label" for="reducedTaxRate">適用</label>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-2">
                  <FormLabel>在庫商品</FormLabel>
                </div>
                <div class="col-md-10">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="stockItem"
                      :checked="searchForm.stockItem"
                      @change="
                        $emit('update:searchForm', {
                          ...searchForm,
                          stockItem: $event.target.checked
                        })
                      "
                    />
                    <label class="form-check-label" for="stockItem">在庫</label>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary me-2" @click="$emit('search-products')">
                  <i class="bi bi-save me-1"></i>登録
                </button>
                <button class="btn btn-secondary" @click="$emit('reset-form')">
                  <i class="bi bi-x-circle me-1"></i>CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseInput from '@/components/common/BaseInput.vue'
  import SearchInput from '@/components/common/SearchInput.vue'
  import FormLabel from '@/components/common/FormLabel.vue'
  import NumberInput from '@/components/common/NumberInput.vue'

  defineProps({
    searchForm: {
      type: Object,
      required: true
    },
    customerProducts: {
      type: Array,
      required: true
    },
    currentProduct: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    // Lists for search popups
    customerList: {
      type: Array,
      default: () => []
    },
    personList: {
      type: Array,
      default: () => []
    },
    departmentList: {
      type: Array,
      default: () => []
    },
    mixCodeList: {
      type: Array,
      default: () => []
    },
    orderPlaceList: {
      type: Array,
      default: () => []
    },
    janCodeList: {
      type: Array,
      default: () => []
    }
  })

  defineEmits([
    'update:searchForm',
    'search-products',
    'reset-form',
    'show-add-modal',
    'edit-product',
    'save-product',
    'delete-product',
    'change-page',
    // Search popup events
    'search-customer',
    'select-customer',
    'search-department',
    'select-department',
    'search-mix-code',
    'select-mix-code',
    'search-order-place',
    'select-order-place'
  ])
</script>
