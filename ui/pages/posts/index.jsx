import MainLayout from '../../components/MainLayout/MainLayout.jsx';
import nomadClient from '@nomad/nomad-client';
import PostList from '../../components/PostList/PostList.jsx';

export default function Posts({ posts, cursor }) {
  return (
    <MainLayout>
      <PostList posts={posts} cursor={cursor} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const response = await nomadClient.getPosts(null, 3);
  return { props: { posts: response.posts, cursor: response.cursor } };
}
