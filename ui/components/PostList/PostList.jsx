import styles from './PostList.module.less';
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from "react";
import nomadClient from "@nomad/nomad-client";
import PostImage from '../PostImage/PostImage.jsx';
import PostAlbum from '../PostAlbum/PostAlbum.jsx';

function postFactory(post) {
  if (post.mediaType === 'IMAGE') {
    return <PostImage post={post} key={post.id} />
  }
  if (post.mediaType === 'CAROUSEL_ALBUM') {
    return <PostAlbum post={post} key={post.id} />
  }
  console.log(`warning: unsupported post type ${post.mediaType}`);
}

export default function PostList({ posts, cursor }) {
  const [currentPosts, setItems] = useState(posts);
  const [currentCursor, setCursor] = useState(cursor);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    const response = await nomadClient.getPosts(currentCursor, 3);

    if (response.posts.length > 0) {
      setItems([...currentPosts, ...response.posts]);
      setCursor(response.cursor);
    } else {
      setHasMore(false);
    }
  }

  return (
    <InfiniteScroll className={styles.postContainer} loadMore={loadMore} hasMore={hasMore} loader={<div key={'0'}>loading...</div>}>
      {currentPosts.map(p => postFactory(p)).filter(exist => exist !== undefined)}
    </InfiniteScroll>
  );
}

