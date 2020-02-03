import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Row,
} from 'reactstrap';
import InfoFee from './InfoFee';
import ListMerchant from './ListMerchant';
import './css/index.scss';

class PaymentApply extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="border gp-add-merchant-list">
        <h5 className="mb-3">Thông Tin Phí</h5>
        <Row>
          <InfoFee />
        </Row>
        <Row>
          <ListMerchant />
        </Row>
      </div>
    );
  }
}

export default withRouter(PaymentApply);
