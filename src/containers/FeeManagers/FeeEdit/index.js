import React from 'react';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
} from 'reactstrap';
import './index.scss';
import FeeTableEdit from '../../../components/Fee/FeeTableEdit';

class FeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="6" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">Chỉnh sửa chi tiết giao dịch</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <FeeTableEdit
              tHead={data.fields}
              tData={data.data}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FeeEdit;
