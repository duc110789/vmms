import React from 'react';
import {
  Modal, ModalBody, Row, ModalFooter, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './index.scss';

class FeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  getDerivedStateFromProps(nextProps) {
    const { data } = this.props;
    if (data !== nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const {
      open,
    } = this.props;
    const { data } = this.state;
    return (
      <div className="animated fadeIn">
        <Modal
          isOpen={open}
          centered
          style={{
            maxWidth: 800,
          }}
          handleToggleDetailFee={this.handleToggleDetailFee}
        >
          <ModalBody>
            <Row>
              a
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button>Resubmit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FeeDetail;

FeeDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
};
