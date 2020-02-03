import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import Select from 'react-select';
import {
  Row, Col,
  FormGroup, Label, Button,
} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';


class FillFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeType: null,
    };
  }

  render() {
    const {
      isClearable,
      feeType,
    } = this.state;
    return (
      <Row>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Loại phí</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectFeeType}
                options={feeType}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Mức phí</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectTypeSource}
                // options={typeSource}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Loại phí</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectFeeType}
                options={feeType}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Mức phí</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectTypeSource}
                // options={typeSource}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6" className="mb-3 mt-3">
          <FormGroup row>
            <Col className="text-right btn-search">
              <Button
                className="icon-search btn btn-primary"
                onClick={this.searchFee}
              >
                <i className="icon-magnifier" />
                {' '}
                      Tìm kiếm
              </Button>
            </Col>
          </FormGroup>
        </Col>
        <Col md="6" className="mb-3 mt-3">
          <FormGroup row>
            <Col className="text-left btn-search">
              <Button
                onClick={this.addButtonAction}
                className="icon-search btn btn-primary"
              >
                <i className="icon-plus" />
                {' '}
                  Thêm mới
              </Button>
            </Col>
          </FormGroup>
        </Col>
      </Row>

    );
  }
}

export default connect()(withRouter(FillFee));
