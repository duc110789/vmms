import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Row,
} from 'reactstrap';
import TypeApply from './TypeApply';
import ListMerchant from './ListMerchant';
import './css/index.scss';

class MerchantApply extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="border gp-add-merchant-list">
        <h5 className="mb-3">Danh Sách MC Áp Dụng</h5>
        <Row>
          <TypeApply />
        </Row>
        <Row>
          <ListMerchant />
        </Row>
      </div>
    );
  }
}

export default withRouter(MerchantApply);
