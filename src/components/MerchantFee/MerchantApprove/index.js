import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../MerchantDetail/index.scss';
import { loadReasonForRefuseMerchant } from '../../../store/actions/actionMerchantDetail';
import ListMerchantApply from '../MerchantDetail/ListMerchantApply';
import InfoGeneral from '../MerchantDetail/InfoGeneral';
import InfoFeeDetail from '../MerchantDetail/InfoFeeDetail';


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
      dataObject,
    } = this.state;
    return (
      <div>
        <InfoGeneral
          dataObject={dataObject}
        />
        <InfoFeeDetail
          dataObject={dataObject}
        />
        <ListMerchantApply />
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
