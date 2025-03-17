import repository from '@/utils/repository'

const resource = '/customers'

export default {
  /**
   * Lấy danh sách tất cả khách hàng
   * @returns {Promise} Promise chứa danh sách khách hàng
   */
  getAll() {
    return repository.get(`${resource}`)
  },

  /**
   * Lấy thông tin chi tiết của một khách hàng
   * @param {string} id - ID của khách hàng
   * @returns {Promise} Promise chứa thông tin chi tiết khách hàng
   */
  getById(id) {
    return repository.get(`${resource}/${id}`)
  },

  /**
   * Tìm kiếm khách hàng theo các tiêu chí
   * @param {Object} params - Các tham số tìm kiếm
   * @returns {Promise} Promise chứa kết quả tìm kiếm
   */
  search(params) {
    return repository.get(`${resource}/search`, { params })
  },

  /**
   * Tạo khách hàng mới
   * @param {Object} customer - Thông tin khách hàng mới
   * @returns {Promise} Promise chứa thông tin khách hàng đã tạo
   */
  create(customer) {
    return repository.post(`${resource}`, customer)
  },

  /**
   * Cập nhật thông tin khách hàng
   * @param {string} id - ID của khách hàng
   * @param {Object} customer - Thông tin khách hàng cần cập nhật
   * @returns {Promise} Promise chứa thông tin khách hàng đã cập nhật
   */
  update(id, customer) {
    return repository.put(`${resource}/${id}`, customer)
  },

  /**
   * Xóa khách hàng
   * @param {string} id - ID của khách hàng
   * @returns {Promise} Promise chứa kết quả xóa
   */
  delete(id) {
    return repository.delete(`${resource}/${id}`)
  },

  /**
   * Lấy danh sách sản phẩm của khách hàng
   * @param {string} customerId - ID của khách hàng
   * @returns {Promise} Promise chứa danh sách sản phẩm
   */
  getCustomerProducts(customerId) {
    return repository.get(`${resource}/${customerId}/products`)
  },

  /**
   * Tìm kiếm sản phẩm của khách hàng theo các tiêu chí
   * @param {Object} params - Các tham số tìm kiếm
   * @returns {Promise} Promise chứa kết quả tìm kiếm
   */
  searchCustomerProducts(params) {
    return repository.get(`${resource}/products/search`, { params })
  },

  /**
   * Tạo sản phẩm mới cho khách hàng
   * @param {Object} customerProduct - Thông tin sản phẩm khách hàng
   * @returns {Promise} Promise chứa thông tin sản phẩm đã tạo
   */
  createCustomerProduct(customerProduct) {
    return repository.post(`${resource}/products`, customerProduct)
  },

  /**
   * Cập nhật thông tin sản phẩm của khách hàng
   * @param {string} id - ID của sản phẩm khách hàng
   * @param {Object} customerProduct - Thông tin sản phẩm cần cập nhật
   * @returns {Promise} Promise chứa thông tin sản phẩm đã cập nhật
   */
  updateCustomerProduct(id, customerProduct) {
    return repository.put(`${resource}/products/${id}`, customerProduct)
  },

  /**
   * Xóa sản phẩm của khách hàng
   * @param {string} id - ID của sản phẩm khách hàng
   * @returns {Promise} Promise chứa kết quả xóa
   */
  deleteCustomerProduct(id) {
    return repository.delete(`${resource}/products/${id}`)
  }
}
