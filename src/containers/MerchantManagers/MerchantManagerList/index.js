import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

class index extends Component {
  constructor(props) {
    super(props);
    this.titleTable = [
      'ID',
      '検査予定日',
      '担当者',
      'エリア',
      '橋名',
      'ステータス',
      '報告期限',
      '',
    ];
  }

  render() {
    return (
      <div>
        aaaa
      </div>
    );
  }
}

export default withRouter(index);
