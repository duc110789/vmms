import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, Row, Card, CardBody, Label, Collapse,
} from 'reactstrap';
import './index.scss';
import { connect } from 'react-redux';
import { getTypeNameFee } from '../../../utils/commonFunction';
import {
  getClassifySigning, loadFeeStatus, loadPayChannel, loadTypeSource,
} from '../../../store/actions/actionMerchantCommon';

class InfoGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
    this.handOpenInfo = this.handOpenInfo.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      dataObject,
      classifySigning,
      feeStatus,
      payChannel,
      typeSource,
    } = props;

    return {
      dataObject,
      classifySigning,
      feeStatus,
      payChannel,
      typeSource,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line no-shadow
      getClassifySigning, loadFeeStatus, loadPayChannel, loadTypeSource,
    } = this.props;
    getClassifySigning();
    loadFeeStatus();
    loadPayChannel();
    loadTypeSource();
  }

  handOpenInfo() {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  }

  render() {
    const {
      isOpenInfo, dataObject, classifySigning, feeStatus, payChannel, typeSource,
    } = this.state;
    let optionsClassifySigning = null;
    optionsClassifySigning = classifySigning && classifySigning.map(
      (classify, index) => (
        {
          code: parseInt(classify.code, 10),
          description: classify.description,
        }
      ),
    );
    let optionsFeeStatus = null;
    optionsFeeStatus = feeStatus && feeStatus.map(
      (feestatus, index) => (
        {
          code: parseInt(feestatus.code, 10),
          description: feestatus.description,
        }
      ),
    );
    let optionsPayChannel = null;
    optionsPayChannel = payChannel && payChannel.map(
      (paychannel, index) => (
        {
          code: parseInt(paychannel.code, 10),
          description: paychannel.description,
        }
      ),
    );
    let optionsTypeSource = null;
    optionsTypeSource = typeSource && typeSource.map(
      (typesource, index) => (
        {
          code: parseInt(typesource.code, 10),
          description: typesource.description,
        }
      ),
    );

    const classifySigningDisplay = dataObject
      ? getTypeNameFee(optionsClassifySigning, dataObject && dataObject.classifySigning) : 0;
    const feeStatusDisplay = dataObject
      ? getTypeNameFee(optionsFeeStatus, dataObject && dataObject.status) : 0;
    const payChannelDisplay = dataObject
      ? getTypeNameFee(optionsPayChannel, dataObject && dataObject.payChannel) : 0;
    const typeSourceDisplay = dataObject
      ? getTypeNameFee(optionsTypeSource, dataObject && dataObject.typeSource) : 0;
    return (
      <div className="page-content">
        <div className="page-content-area">
          <Form className="form-horizoral">
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <h4 className="widget-title lighter">THÔNG TIN CHUNG</h4>
                    <div className="widget-toolbar">
                      <span data-action="Collapse">
                        {isOpenInfo ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfo} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="widget-body">
                          <div className="widget-main">
                            <div className="box row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Phân loại ký kết</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {classifySigningDisplay}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Số HD/PL/CV</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.contract}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Tên mức phí</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.feeName}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Ngày ký</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.signDate}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Ngày áp dụng - Ngày hết hạn</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.applyDate}
                                        {' '}
-
                                        {' '}
                                        {dataObject && dataObject.expirationDate}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Kênh thanh toán</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {payChannelDisplay}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Hình thức thanh toán</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {typeSourceDisplay}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Trạng thái</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {feeStatusDisplay}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <Label className="col-sm-12 control-label p_top font-weight-bold">Lịch sử thay đổi</Label>
                                </div>
                                <div className="form-group">
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Người tạo</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.createUser}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Người duyệt</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.approvedUser}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Người khóa</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.lockUser}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Người mở khóa</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.createUser}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Thời gian tạo</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.signDate}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Thời gian duyệt</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.approvedDate}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Thời gian khóa</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.lockDate}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <Label className="col-sm-6 control-label p_top">Thời gian mở khóa</Label>
                                      <div className="col-sm-6">
                                        <Label>
                                          <b>
                                            {dataObject && dataObject.unlockDate}
                                          </b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataObject: state.merchantDetail.dataObject,
  classifySigning: state.merchantCommon.classifySigning,
  feeStatus: state.merchantCommon.feeStatus,
  payChannel: state.merchantCommon.payChannel,
  typeSource: state.merchantCommon.typeSource,
  isOpenInfo: state.merchantCommon.isOpenInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getClassifySigning: () => dispatch(getClassifySigning()),
  loadFeeStatus: () => dispatch(loadFeeStatus()),
  loadPayChannel: () => dispatch(loadPayChannel()),
  loadTypeSource: () => dispatch(loadTypeSource()),
});

InfoGeneral.propTypes = {
  dataObject: PropTypes.object,
  classifySigning: PropTypes.array,
  feeStatus: PropTypes.array,
  payChannel: PropTypes.array,
  typeSource: PropTypes.array,
  getClassifySigning: PropTypes.func.isRequired,
  loadFeeStatus: PropTypes.func.isRequired,
  loadPayChannel: PropTypes.func.isRequired,
  loadTypeSource: PropTypes.func.isRequired,
};

InfoGeneral.defaultProps = {
  dataObject: () => {},
  classifySigning: [],
  feeStatus: [],
  payChannel: [],
  typeSource: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoGeneral));
