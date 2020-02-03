/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  Row, Col, Input as RInput, FormGroup, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Creatable from 'react-select/creatable';

class InfoGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeType: 0,
      classifySigning: 0,
      vatTax: 0,
      feeName: 0,
      additionalSigning: 0,
    };
  }

  componentDidMount() {
    const { tdata } = this.props;
    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    this.setState({
      feeType: getFeeType[tdata.feeType - 1].description,
      classifySigning: getClassifySigning[tdata.classifySigning - 1].description,
      vatTax: tdata.vatTax.toString(),
      feeName: tdata.feeName,
    });
  }

  componentDidUpdate() {
    const {
      feeType, feeName,
      classifySigning,
      vatTax,
      additionalSigning,
    } = this.state;
    const {
      tranfersDataGeneralFee,
    } = this.props;
    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    const sendData = {
      feeType: feeType === getFeeType[0].description
        ? parseInt(getFeeType[0].code, 10) : feeType,
      classifySigning: classifySigning === getClassifySigning[0].description
        ? parseInt(getClassifySigning[0].code, 10)
        : (classifySigning === getClassifySigning[1].description
          ? parseInt(getClassifySigning[1].code, 10) : parseInt(getClassifySigning[2].code, 10)),
      feeName,
      vatTax: vatTax === 0 || typeof vatTax === 'number' ? vatTax : parseFloat(vatTax.replace(/,/g, '.')),
      additionalSigning,
    };
    tranfersDataGeneralFee(sendData);
  }

   inputHandleChange = (event, controlName) => {
     if (controlName === 'additionalSigning') {
       this.setState((prevState) => ({
         additionalSigning: prevState.additionalSigning === 0 ? 1 : 0,
       }));
     } else {
       this.setState({
         [controlName]: event.target.value,
       });
     }
   }

  feeTypeHandleChange = (event) => {
    this.inputHandleChange(event, 'feeType');
  }

  vatTaxHandleChange = (event) => {
    this.inputHandleChange(event, 'vatTax');
  }

  feeNameHandleChange = (event) => {
    this.inputHandleChange(event, 'feeName');
  }

  additionalSigningHandleChange = (event) => {
    this.inputHandleChange(event, 'additionalSigning');
  }


  render() {
    const {
      feeType, feeName,
      classifySigning,
      vatTax,
      additionalSigning,
    } = this.state;
    const {
      tdata, isUpdate, errorCheckFeeTax,
    } = this.props;
    const getFeeType = localStorage.getItem('FEE_TYPE') ? JSON.parse(localStorage.getItem('FEE_TYPE')).map((feeTypeDes) => ({ value: feeTypeDes.description, label: feeTypeDes.description })) : null;
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')).map((classify) => ({ value: classify.description, label: classify.description }));
    return (
      <div className="border gp-add-fee">
        <h5 className="mb-3 text-left">Thông tin chung</h5>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">
                  Loại phí
                  <span style={{ color: 'red' }}>*</span>
                  :
                </Label>
              </Col>
              <Col lg="7">
                <Creatable
                  options={getFeeType}
                  isMulti={false}
                  placeholder="Phí thu merchant"
                  onChange={(selectedOption) => this.setState({
                    feeType: selectedOption.value,
                  })}
                  value={{
                    value: feeType,
                    label: (feeType || 'Chọn'),
                  }}
                  isDisabled={!!(tdata.status === 1 || tdata.status === 2)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">Mã phí:</Label>
              </Col>
              <Col lg="7">
                <RInput
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  onChange={this.feeCodeHandleChange}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">Thuế GTTT:</Label>
              </Col>
              <Col lg="7">
                <NumberFormat
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  onChange={this.vatTaxHandleChange}
                  value={vatTax}
                  allowNegative={false}
                  maxLength={5}
                />
                <span className="form-text text-danger">
                  {errorCheckFeeTax}
                </span>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">
                  Phân loại ký kết
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                  :
                </Label>
              </Col>
              <Col lg="7">
                <Creatable
                  options={getClassifySigning}
                  onChange={(selectedOption) => this.setState({
                    classifySigning: selectedOption ? selectedOption.value : 'Chọn',
                  })}
                  value={{
                    value: classifySigning,
                    label: (classifySigning || 'Chọn'),
                  }}
                  isDisabled={
                    !!(tdata.status === 2
                    || (tdata.status === 1 && additionalSigning === 0))
                  }
                />
                {isUpdate === false ? <span className="form-text text-danger">Vui lòng nhập đúng thứ tự hợp đồng, phụ lục, công văn</span> : null}
              </Col>
            </FormGroup>
            <FormGroup className="account-settings-pointer" row>
              <Col lg="12">
                <Label className="permission-title">
                  <RInput
                    type="checkbox"
                    value={additionalSigning}
                    onChange={this.additionalSigningHandleChange}
                    disabled={tdata.status === 2}
                  />
                Bổ sung kí kết
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">
                  Tên mức phí
                  <span style={{ color: 'red' }}>*</span>
                  :
                </Label>
              </Col>
              <Col lg="7">
                <RInput
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  onChange={this.feeNameHandleChange}
                  maxLength="100"
                  value={feeName}
                  disabled
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
export default InfoGeneral;
InfoGeneral.propTypes = {
  tdata: PropTypes.object,
  tranfersDataGeneralFee: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  errorCheckFeeTax: PropTypes.string,
};

InfoGeneral.defaultProps = {
  tdata: '',
  errorCheckFeeTax: null,
};
