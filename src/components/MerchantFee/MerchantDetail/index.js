import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';
import { loadReasonForRefuseMerchant } from '../../../store/actions/actionMerchantDetail';
import {
  toggleAction,
} from '../../../store/actions/actionMerchantCommon';
import ListMerchantApply from './ListMerchantApply';
import InfoGeneral from './InfoGeneral';
import InfoFeeDetail from './InfoFeeDetail';
import ReasonForRefuse from './ReasonForRefuse';


class index extends Component {
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
      dataObject, isOpenInfo,
    } = this.state;
    return (
      <div>
        <ReasonForRefuse
          dataObject={dataObject}
          isOpenInfo={isOpenInfo}
        />
        <InfoGeneral
          dataObject={dataObject}
          isOpenInfo={isOpenInfo}
        />
        <InfoFeeDetail
          dataObject={dataObject}
          isOpenInfo={isOpenInfo}
        />
        <ListMerchantApply />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataObject: state.merchantDetail.dataObject,
  isOpenInfo: state.merchantCommon.isOpenInfo,
});

const mapDispatchToProps = (dispatch) => ({
  loadReasonForRefuseMerchant: (data) => dispatch(loadReasonForRefuseMerchant(data)),
  toggleAction: () => dispatch(toggleAction()),
});

index.propTypes = {
  match: PropTypes.object,
  loadReasonForRefuseMerchant: PropTypes.func,
  dataObject: PropTypes.object,
};

index.defaultProps = {
  match: null,
  loadReasonForRefuseMerchant: null,
  dataObject: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
