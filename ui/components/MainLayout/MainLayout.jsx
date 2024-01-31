import styles from './MainLayout.module.less';
import Head from 'next/head';
import MainHeader from '../MainHeader/MainHeader.jsx';
import MainFooter from '../MainFooter/MainFooter.jsx';

import { FloatButton, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
  return (
    <>
      <Head>
        <title>Ultragram</title>
        <meta name="description" content="the ultimate instagram app" />
      </Head>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <MainHeader />
        </Header>
        <Content className={styles.content}>{props.children}</Content>
        <Footer className={styles.footer}>
          <MainFooter />
        </Footer>
      </Layout>
      <FloatButton.BackTop>
        Button
      </FloatButton.BackTop>
    </>
  );
}
