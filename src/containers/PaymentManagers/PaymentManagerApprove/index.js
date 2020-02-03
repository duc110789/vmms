import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
} from 'reactstrap';

import MerchantApprove from '../../../components/MerchantFee/MerchantApprove';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="6" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">CHI TIẾT</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <MerchantApprove />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(index);
