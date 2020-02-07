import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../DetailPage/index.scss';
import {
  Button, Col,
} from 'reactstrap';
import { loadReasonForRefuseMerchant } from '../../../store/actions/actionMerchantDetail';
import InfoGeneral from '../DetailPage/InfoGeneral';
import InfoFeeDetail from '../DetailPage/InfoFeeDetail';
import InfoFee from '../DetailPage/InfoFee';
import Refuse from '../Modal/Refuse';


class ApprovalPage extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      matchId: match.params.id,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      dataObject,
    } = props;
    return {
      dataObject,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line no-shadow
      loadReasonForRefuseMerchant,
    } = this.props;
    const { matchId } = this.state;
    loadReasonForRefuseMerchant(matchId);
  }

  render() {
    const {
      dataObject,
    } = this.state;
    return (
      <div>
        <InfoGeneral
          dataObject={dataObject}
        />
        <InfoFee />
        <InfoFeeDetail
          dataObject={dataObject}
        />
        <Col md={12} style={{ marginBottom: '20px' }}>
          <div className="text-center mt-5">
            <Button title="Về danh sách" className="btn bggrey bigger-150" onClick={() => this.goBack()} onKeyPress={() => this.goBack()}>
              <i className="fa fa-arrow-left mr-1" aria-hidden="true" />
              Quay lại
            </Button>
            <Button className="btn btn-middle bigger-150 btn-primary btn btn-secondary" style={{ marginLeft: '40px', backgroundColor: '#9932CC' }}>
              Từ chối
            </Button>
            <Button className="btn bggreen bigger-150" style={{ marginLeft: '40px' }}>
              Duyệt
              <i className="fa fa-arrow-right bigger-110 ml-1" />
            </Button>
          </div>
        </Col>
        <Refuse />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataObject: state.merchantDetail.dataObject,
});

const mapDispatchToProps = (dispatch) => ({
  loadReasonForRefuseMerchant: (data) => dispatch(loadReasonForRefuseMerchant(data)),
});

ApprovalPage.propTypes = {
  match: PropTypes.object,
  loadReasonForRefuseMerchant: PropTypes.func,
  dataObject: PropTypes.object,
};

ApprovalPage.defaultProps = {
  match: null,
  loadReasonForRefuseMerchant: null,
  dataObject: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApprovalPage));
