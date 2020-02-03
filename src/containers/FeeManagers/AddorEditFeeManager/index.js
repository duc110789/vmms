import React from 'react';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './index.scss';
import FeeTableAdd from '../../../components/Fee/FeeTableAdd';

class FeeManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    const { data } = this.state;
    const { changeFeeTableAdd } = this.props;

    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="6" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">Thêm mới </span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <FeeTableAdd
              tHead={data.fields}
              tData={data.data}
              changeFeeTableAdd={changeFeeTableAdd}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FeeManagerList;
FeeManagerList.propTypes = {
  changeFeeTableAdd: PropTypes.func,
};

FeeManagerList.defaultProps = {
  changeFeeTableAdd: null,
};
