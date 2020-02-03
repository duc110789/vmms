import React from 'react';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
} from 'reactstrap';
import './index.scss';
import FeeTable from '../../../components/Fee/FeeTable';

class FeeManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="6" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">Quản lý bảng phí</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <FeeTable />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FeeManagerList;
