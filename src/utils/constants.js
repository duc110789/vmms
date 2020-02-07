// Define text in project
const CONST_VARIABLE = {
  LOCK_FEE_LIST: 'Bạn có chắc chắn khóa bảng phí này?',
  UNLOCK_FEE_LIST: 'Bạn có chắc chắn mở khóa bảng phí này?',
  EMPTY_DATA: 'Không có dữ liệu hợp lệ',
  DELETE_DATA: 'Bạn có chắc chắn xóa mức phí này?',
  DELETE_DATA_MERCHANT: 'Bạn có chắc chắn xóa merchant này?',
  DELETE_DATA_BANKS: 'Bạn có chắc chắn muốn xóa?',
  DEFAULT_PERPAGE: 5,
  MAX_FILE_SIZE_UPLOAD: 5242880,
  PAGE_OPTION: [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
  ],
  URL_DOWLOAD_FILE_DEMO: 'http://10.22.7.105:8080/QrcodeUploadAPI/resources/templateDocument/MID_ddMMyyyy.xls',
  ADD_FEE_MERCHANT_SUCCESS: 'Bạn đã thêm mức phí merchant thành công!',
  TITLE_NOTIFICATION: 'Thông báo',
  APPY_FEE_MERCHANT_WARNING: 'Các trường đánh dấu * bắt buộc phải điền.',
  DATE_SIGNING_AFTER_DATE_APPLY: 'Ngày áp dụng phải sau ngày đăng kí.',
  DATE_EXPRICE_AFTER_DATE_APPLY: 'Ngày hết hạn phải sau ngày áp dụng.',
  DATE_SIGNING_MUST_AFTER_CURRENT_DATE: 'Ngày kí phải lớn hơn ngày hiện tại.',
  DATE_EXPIRATION_MUST_LARGER_CURRENT_DATE: 'Ngày hết hạn cần phải lớn hơn ngày hiện tại.',
  MERCHANT_ID_MC_NAME: 'Dữ liệu Merchant ID - Tên Merchant không hợp lệ.',
  TYPE_MERCHANT: 'Loại hình doanh nghiệp không được để trống.',
  CHOOSE_FILE_EXCELL: 'Bạn phải chọn file excel.',
};

export default CONST_VARIABLE;

export const categoryTime = [{
  value: 'Ngày', label: 'Ngày',
},
{
  value: 'Tuần', label: 'Tuần',
},
{
  value: 'Tháng', label: 'Tháng',
}];

export const notifyToast = {
  APPLY_FEE_SUCCESS: 'Bạn đã add bản ghi mới thành công',
  NOTIFY_SUCCESS: 'Chúc mừng',
  APPY_FEE_WARNING: 'Các trường đánh dấu * bắt buộc phải điền',
  NOTIFY_WARNING: 'Cảnh Báo',
  SUBMIT_FEE_SUCCESS: 'Bạn đã tạo thành công bản ghi trên server',
  SUBMIT_FEE_WARNING: 'Bạn cần tạo bản ghi trước khi lưu',
};

export const notifyToastEditFee = {
  EDIT_FEE_SUCCESS: 'Bạn đã chỉnh sửa bản ghi mới thành công',
  NOTIFY_SUCCESS: 'Chúc mừng',
  NOTIFY_WARNING: 'Cảnh Báo',
  EDIT_FEE_FAILED: 'Quá trình chỉnh sửa bản ghi mới đã thất bại',
};

export const notifyDelete = {
  NOTIFY_BEFORE_PRESS_DELETE: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
};
