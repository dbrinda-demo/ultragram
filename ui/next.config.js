import withLess from 'next-with-less';

const less = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    }
  },
});



export default Object.assign({}, less, {
  transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip' ]
});
