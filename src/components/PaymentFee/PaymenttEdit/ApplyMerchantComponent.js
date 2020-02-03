import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Col, Input as RInput, FormGroup, Label, Button,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import MultiSelect from '../../common/MultiSelect';
import {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents,
} from '../../common/CheckboxMultiSelect';
import ListErrors from './modal/ListErrors';

const applyStyleArr = [
  { value: '1', label: 'Theo danh sách có sẵn' },
  { value: '2', label: 'Theo upload file' },
];

class TypeApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
      applyStyle: '1',
      isShowModalErrors: false,
    };
    this.toggleErrors = this.toggleErrors.bind(this);
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
  };


  handleChangeApplyStyle = (newValue) => {
    console.log(newValue,'new Value');
    if (newValue) {
      this.setState({
        applyStyle: newValue.value,
      });
    }
  };

  openToggleErrors() {
    this.toggleErrors();
  }

  toggleErrors() {
    const { isShowModalErrors } = this.state;
    this.setState({
      isShowModalErrors: !isShowModalErrors,
    });
  }

  render() {
    const { optionSelected, applyStyle, isShowModalErrors } = this.state;
    return (
      <>
        <Col md={{ size: 6 }}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                Hình thức áp dụng
              </Label>
            </Col>
            <Col lg="8">
              <CreatableSelect
                options={applyStyleArr}
                onChange={this.handleChangeApplyStyle}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md={6} />
        <Col md={6}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                Loại hình doanh nghiệp (Theo MCC):
              </Label>
            </Col>
            <Col lg="8">
              {applyStyle === '1' ? (
                <div
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <MultiSelect
                    options={colourOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                      animatedComponents,
                    }}
                    onChange={this.handleChange}
                    allowSelectAll
                    value={optionSelected}
                  />
                </div>
              ) : (
                <div className="upload-mc">
                  <RInput
                    type="file"
                  />
                  <span>
                    <Button className="btn btn-primary">
                      Upload
                    </Button>
                  </span>
                  <Label className="mt-4">
                    Tải file danh sách mẫu tại đây:
                    <strong className="decoration-text ml-1 text-primary">
                      MID_ddMMyyyy.xlsx
                    </strong>
                  </Label>
                  <Label>
                    Số lượng MC không hợp lệ:
                    <b className="pl-1">10</b>
                  </Label>
                  <Label>
                    Số lượng MC hợp lệ:
                    <b className="pl-1">00</b>
                  </Label>
                  <FormGroup>
                    <b className="decoration-text text-primary" onClick={() => this.openToggleErrors()}>
                      Chi tiết lỗi
                    </b>
                  </FormGroup>
                </div>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md={6} />
        {applyStyle === '1' ? (
          <Col md={6}>
            <FormGroup row>
              <Col lg="4" className="label-left">
                <Label>
                  Merchant ID - Tên Merchant
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                  :
                </Label>
              </Col>
              <Col lg="8">
                <div
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <MultiSelect
                    options={colourOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                      animatedComponents,
                    }}
                    onChange={this.handleChange}
                    allowSelectAll
                    value={optionSelected}
                  />
                </div>
              </Col>
            </FormGroup>
          </Col>
        ) : ('')}
        <Col md={12}>
          <Label>
            Tổng số merchant áp dụng:
            <strong className="text-danger pl-1">1000</strong>
          </Label>
        </Col>
        <ListErrors
          toggleErrors={this.toggleErrors}
          isShowModalErrors={isShowModalErrors}
          // feeCode={feeCode}
          // onDeleteFee={this.deleteByFeeCode}
        />
      </>

    );
  }
}

export default withRouter(TypeApply);
