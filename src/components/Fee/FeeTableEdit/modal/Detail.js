import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const ModalDetail = (props) => {
  const { toggleDetailFee, isShowModalDetail, tdata } = props;
  const toggle = () => toggleDetailFee();
  return (
    <div>
      <Modal isOpen={isShowModalDetail} toggle={toggle} size="lg" style={{ maxWidth: '1600px', width: '80%' }}>
        <ModalHeader toggle={toggle}>Bảng chi tiết</ModalHeader>
        <ModalBody>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={2} className="text-center" bgcolor="#ececec">Phí cố định</th>
                <th colSpan={4} className="text-center" bgcolor="#ececec">Phí xử lý thanh toán</th>
                <th colSpan={2} className="text-center" bgcolor="#ececec">Giá trị giao dịch</th>
                <th colSpan={2} className="text-center" bgcolor="#ececec">Số lượng giao dịch</th>
              </tr>
              <tr>
                <th rowSpan={0} colSpan={1} className="text-center">Theo số tiền</th>
                <th rowSpan={0} className="text-center" colSpan={1}>Theo phần trăm</th>
                <th rowSpan={0} colSpan={1} className="text-center">Theo số tiền</th>
                <th rowSpan={0} className="text-center" colSpan={1}>Theo phần trăm</th>
                <th colSpan={2} className="text-center">Giới hạn phí thanh toán</th>
                <th rowSpan={2} className="text-center">Từ</th>
                <th rowSpan={2} className="text-center">Đến</th>
                <th rowSpan={2} className="text-center">Từ</th>
                <th rowSpan={2} className="text-center">Đến</th>
              </tr>
              <tr>
                <th className="text-center">Tối thiểu</th>
                <th className="text-center">Tối đa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>{tdata && tdata.feeFlatType === 0 ? tdata.feeFlat : null}</td>
                <td>{tdata && tdata.feeFlatType === 1 ? tdata.feeFlat : null}</td>
                <td>{tdata && tdata.feePaymentType === 0 ? tdata.feePayment : null}</td>
                <td>{tdata && tdata.feePaymentType === 1 ? tdata.feePayment : null}</td>
                <td>{(tdata && tdata.calculationForm === 1) || tdata.calculationForm === 0 ? tdata.feeMinHandle : null}</td>
                <td>{(tdata && tdata.calculationForm === 1) || tdata.calculationForm === 0 ? tdata.feeMaxHandle : null}</td>
                <td>{tdata && tdata.calculationForm === 2 && (tdata.calculationRules === 1 || tdata.calculationRules === 3) ? tdata.feeMinHandle : null }</td>
                <td>{tdata && tdata.calculationForm === 2 && (tdata.calculationRules === 1 || tdata.calculationRules === 3) ? tdata.feeMaxHandle : null }</td>
                <td>{tdata && tdata.calculationForm === 2 && tdata.calculationRules === 2 ? tdata.feeMinHandle : null}</td>
                <td>{tdata && tdata.calculationForm === 2 && tdata.calculationRules === 2 ? tdata.feeMaxHandle : null}</td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle} type="button" title="Về danh sách" class="btn bggrey bigger-150 btn btn-secondary">Quay lại</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalDetail;
ModalDetail.propTypes = {
  isShowModalDetail: PropTypes.bool.isRequired,
  toggleDetailFee: PropTypes.func,
  tdata: PropTypes.object.isRequired,
};

ModalDetail.defaultProps = {
  toggleDetailFee: function name(params) {
    return params;
  },
};
