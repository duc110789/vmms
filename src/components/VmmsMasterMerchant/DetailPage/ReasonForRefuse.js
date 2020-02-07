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
  loaddeniedDesc,
} from '../../../store/actions/actionMerchantCommon';

class ReasonForRefuse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      dataObject, deniedDesc,
    } = props;
    return {
      dataObject, deniedDesc,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line no-shadow
      loaddeniedDesc,
    } = this.props;
    loaddeniedDesc();
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  }

  render() {
    const {
      isOpenInfo, dataObject, deniedDesc,
    } = this.state;
    let optionsdeniedDesc = null;
    optionsdeniedDesc = deniedDesc && deniedDesc.map(
      (denieddesc, index) => (
        {
          code: parseInt(denieddesc.code, 10),
          description: denieddesc.description,
        }
      ),
    );
    const deniedDescDisplay = dataObject
      ? getTypeNameFee(optionsdeniedDesc, dataObject && dataObject.deniedDesc) : 0;
    return (
      <div className="page-content">
        <div className="page-content-area">
          <Form className="form-horizoral">
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <h4 className="widget-title lighter">LÝ DO TỪ CHỐI</h4>
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
                                  <Label className="col-sm-4 control-label p_top">Người từ chối</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.deniedUser}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Nội dung</Label>
                                  <div className="col-sm-8">
                                    <Label className="content-word">
                                      <b>
                                        {dataObject && dataObject.deniedNote}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Thời gian</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>
                                        {dataObject && dataObject.deniedDate}
                                      </b>
                                    </Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Chi tiết</Label>
                                  <div className="col-sm-8">
                                    <Label>
                                      <b>{deniedDescDisplay}</b>
                                    </Label>
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
  deniedDesc: state.merchantCommon.deniedDesc,
});

const mapDispatchToProps = (dispatch) => ({
  loaddeniedDesc: () => dispatch(loaddeniedDesc()),
});

ReasonForRefuse.propTypes = {
  dataObject: PropTypes.object,
  deniedDesc: PropTypes.array,
  loaddeniedDesc: PropTypes.func.isRequired,
};

ReasonForRefuse.defaultProps = {
  dataObject: () => {},
  deniedDesc: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReasonForRefuse));
