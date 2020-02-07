export default {
  items: [
    {
      name: 'Quản lý phí MMS',
      icon: 'icon-people',
      children: [
        {
          name: 'Quản lý bảng phí',
          url: '/fee/list',
        },
        {
          name: 'Quản lý module phí thu Merchant',
          url: '/fee-merchant/list',
        },
      ],
    },
    {
      name: 'Quản lý phí VMMS',
      icon: 'icon-people',
      children: [
        {
          name: 'Quản lý bảng phí',
          url: '/vmms/fee/list',
        },
        {
          name: 'Phí VNPAY trả Đơn vị thanh toán',
          url: '/fee-payment/list',
        },
        {
          name: 'Quản lý phí VN PAY thu MasterMerchant',
          url: '/vmms/masterMerchant/list',
        },
      ],
    },
  ],
};
