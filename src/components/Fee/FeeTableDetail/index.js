
import React from 'react';
import {
  Collapse, CardBody, Card, Label, Button,
} from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { callApiDetailFee } from '../../../apis/fee-manager';
import ItemFee from './ItemFee';
import { getTypeNameFee } from '../../../utils/commonFunction';

import './index.scss';

export function getInfoUser(listObject, type = 1) {
  let userInfo = {};
  if (listObject && listObject.length > 0) {
    const listInfo = [];
    // eslint-disable-next-line array-callback-return
    listObject.map((item) => {
      if (type === 1) {
        listInfo.push({
          user: item.modifyUser,
          time: item.modifyDate,
        });
      } else if (type === 2) {
        listInfo.push({
          user: item.lockUser,
          time: item.lockDate,
        });
      } else if (type === 3) {
        listInfo.push({
          user: item.unlockUser,
          time: item.unlockDate,
        });
      }
      // return listInfo;
    });

    let maxTime = listInfo ? listInfo[0].time : {};
    for (let i = 0; i < listInfo.length; i += 1) {
      if (maxTime < listInfo[i].time) { maxTime = listInfo[i].time; }
    }
    userInfo = listInfo.filter((item) => maxTime === item.time);
  }
  return userInfo;
}

class FeeTableDetail extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      isOpenInfo: true,
      isOpenFee: true,
      queryObject: match.params,
      dataObject: {},
      listObject: {},
      feeType: [],
      classifySigning: [],
      statusFee: [],
    };
    this.handOpenInfo = this.handOpenInfo.bind(this);
    this.handOpenFee = this.handOpenFee.bind(this);
    this.checkColorStatus = this.checkColorStatus.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { queryObject } = this.state;
    const params = {
      toRow: 0,
      fromRow: 0,
      feeType: queryObject.feeType,
      classifySigning: queryObject.classifySigning,
      status: queryObject.status,
    };
    const result = await callApiDetailFee(params);

    this.setState({
      dataObject: result.data,
      listObject: result.list,
      feeType: JSON.parse(localStorage.getItem('FEE_TYPE')),
      classifySigning: JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')),
      statusFee: JSON.parse(localStorage.getItem('FEE_STATUS')),
    });
  }

  handOpenInfo() {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  }

  handOpenFee() {
    const { isOpenFee } = this.state;
    this.setState({
      isOpenFee: !isOpenFee,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  checkColorStatus(status) {
    if (status) {
      switch (status) {
        case 1:
          return 'badge badge-success';
        case 2:
          return 'badge badge-info text-white';
        case 3:
          return 'badge badge-warning';
        default:
          return 'badge badge-danger';
      }
    }
    return '';
  }

  render() {
    const {
      feeType,
      classifySigning,
      statusFee,
      dataObject,
      listObject,
      isOpenFee,
      isOpenInfo,
    } = this.state;
    const { history } = this.props;

    const feeTypeDisplay = dataObject ? getTypeNameFee(feeType, dataObject.feeType) : 0;
    const classifySigningDisplay = dataObject
      ? getTypeNameFee(classifySigning, dataObject.classifySigning) : 0;
    const statusDisplay = dataObject ? getTypeNameFee(statusFee, dataObject.status) : 0;

    let createUser = null;
    let createDate = null;
    let bankCode = null;
    let masterMcCode = null;

    if (listObject && listObject.length > 0) {
      createUser = listObject[0].createUser;
      createDate = listObject[0].createDate;
      bankCode = listObject[0].bankCode;
      masterMcCode = listObject[0].masterMcCode;
    }

    const itemModify = getInfoUser(listObject, 1);
    const itemLock = getInfoUser(listObject, 2);
    const itemUnLock = getInfoUser(listObject, 3);

    let listItem = null;
    if (listObject && listObject.length > 0) {
      // eslint-disable-next-line react/no-array-index-key
      listItem = listObject.map((itemFee, index) => <ItemFee key={index} item={itemFee} />);
    } else {
      listItem = <p>Không có bảng phí</p>;
    }

    return (
      <div className="page-content">
        <div className="page-content-area">
          <form className="form-horizontal">
            <div className="row">
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <h4 className="widget-title lighter">Thông tin chung</h4>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
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
                        {/* { (dataObject && listObject) } */}
                        <div className="widget-body">
                          <div className="widget-main">
                            <div className="box row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Loại phí</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {feeTypeDisplay}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Đơn vị TT</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {bankCode}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">MasterMerchant</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {masterMcCode}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Phân loại ký kết</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{classifySigningDisplay}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Số lượng mức phí</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{dataObject ? dataObject.countFeeCode : 0}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Trạng thái</Label>
                                  <div className="col-sm-8">
                                    <Label className={this.checkColorStatus(dataObject.status)}>
                                      <b>{statusDisplay}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Người tạo</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{createUser}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Người chỉnh sửa</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{itemModify.user}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Thời gian tạo</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{createDate}</b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Thời gian chỉnh sửa</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{itemModify.time}</b>
                                    </Label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-5">
                                    <div className="form-group">
                                      <Label className="col-sm-5 control-label p_top">Người khóa</Label>
                                      <div className="col-sm-7">
                                        <Label>
                                          <b>{itemLock.user}</b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <div className="form-group">
                                      <Label className="col-sm-5 control-label p_top">Thời gian khóa</Label>
                                      <div className="col-sm-7">
                                        <Label>
                                          <b><b>{itemLock.time}</b></b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <div className="form-group">
                                      <Label className="col-sm-5 control-label p_top">Người mở khóa</Label>
                                      <div className="col-sm-7">
                                        <Label>
                                          <b><b>{itemUnLock.user}</b></b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <div className="form-group">
                                      <Label className="col-sm-5 control-label p_top">Thời gian mở khóa</Label>
                                      <div className="col-sm-7">
                                        <Label>
                                          <b><b>{itemUnLock.time}</b></b>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.widget-main */}
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                  {/* /.widget-body */}
                </div>
                <div className="clearfix" />
              </div>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenFee} onKeyPress={this.hanOpenFee}>
                    <h4 className="widget-title lighter">Công thức phí</h4>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
                        {isOpenFee ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenFee} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="widget-body">
                          <div className="widget-main">
                            <div className="box">
                              {listItem}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.widget-main */}
                        </div>
                        {/* /.widget-body */}
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="clearfix bottom20" />
            <div className="clearfix form-actions row">
              <div className="col-md-12 text-center">
                <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150" href="#">
                  <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                  <span>Quay lại</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FeeTableDetail);
FeeTableDetail.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
FeeTableDetail.defaultProps = {
  history: {},
  match: {},
};
