/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardHeader, CardBody,
} from 'reactstrap';
import { withRouter } from 'react-router';
import InfoGeneral from './InfoGeneral';
import MerchantApply from '../PaymentAdd/PaymentApply';


// eslint-disable-next-line react/prefer-stateless-function
class MechantEditPage extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isSuccess, history } = this.props;
    if (prevProps.isSuccess !== isSuccess && isSuccess === true)
    {
      history.push('/merchant/sent-merchant-list');
    }
  }

  render() {
    const { editMerchant } = this.props;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold title-header">CHỈNH SỬA PHÍ THU MERCHANT</span>
            </CardHeader>
            <CardBody>
              <InfoGeneral tdata={editMerchant} />
              <MerchantApply />
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editMerchant: state.editMerchant.dataMerchant,
  isSuccess: state.editMerchant.isSuccess,
});

MechantEditPage.propTypes = {
  editMerchant: PropTypes.object,
  isSuccess: PropTypes.bool,
  history: PropTypes.object,

};

MechantEditPage.defaultProps = {
  editMerchant: null,
  isSuccess: false,
  history: '',
};

export default connect(mapStateToProps, null)(withRouter(MechantEditPage));
