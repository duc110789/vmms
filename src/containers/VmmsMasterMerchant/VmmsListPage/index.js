import React from 'react';
import ListPage from '../../../components/VmmsMasterMerchant/ListPage/ListPage';

class VmmsFeeManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="my-requests">
        <ListPage />
      </div>
    );
  }
}

export default VmmsFeeManagerList;
