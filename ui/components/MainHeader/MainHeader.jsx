import styles from './MainHeader.module.less';
import { Menu } from 'antd';
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainHeader() {
  const router = useRouter();

  const menuItems = [{
    label: <Link href="/">Home</Link>,
    key: '/',
  }, {
    label: <Link href="/posts">Posts</Link>,
    key: '/posts',
  }];

  return (
    <>
      <div className={styles.logo} />
      <div style={{flex:1}}></div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[router.pathname]}
        items={menuItems}
      />
    </>
  );
}
