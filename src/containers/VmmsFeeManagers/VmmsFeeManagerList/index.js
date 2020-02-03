import React from 'react';
import ListFee from '../../../components/VmmsFee/ListFee';

class VmmsFeeManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="my-requests">
        <ListFee />
      </div>
    );
  }
}

export default VmmsFeeManagerList;
