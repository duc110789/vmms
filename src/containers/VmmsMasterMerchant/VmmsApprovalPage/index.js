import React from 'react';
import ApprovalPage from '../../../components/VmmsMasterMerchant/ApprovalPage/ApprovalPage';

class VmmsApprovalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="my-requests">
        <ApprovalPage />
      </div>
    );
  }
}

export default VmmsApprovalPage;
