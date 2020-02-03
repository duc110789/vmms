import React from 'react';
import { connect } from 'react-redux';
import {
  Card, CardHeader, CardBody,
} from 'reactstrap';
import './index.scss';
import FillFee from './FillFee';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý bảng phí</span>
            </CardHeader>
            <CardBody>
              <FillFee />
              {/* <TablePayment tdata={tdata} /> */}
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}


index.propTypes = {
};

index.defaultProps = {
};

export default connect()(index);
