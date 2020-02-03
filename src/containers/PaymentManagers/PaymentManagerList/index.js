import React from 'react';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
} from 'reactstrap';
import ListPaymentPage from '../../../components/PaymentFee/ListPayment/ListPaymentPage';

class FeeManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="my-requests">
        <ListPaymentPage />
      </div>
    );
  }
}

export default FeeManagerList;
