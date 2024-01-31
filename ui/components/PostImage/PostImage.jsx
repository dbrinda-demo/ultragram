import styles from './PostImage.module.less';
import postStyles from '../PostList/Post.module.less';
import { timeDifference } from "../../common/dates.js";

export default function PostImage({ post }) {
  return (
    <div className={postStyles.post}>
      <img className={styles.image} src={post.mediaUrl} />
      <div className={postStyles.info}>
        <div className={postStyles.likes}>Likes: {post.likeCount}</div>
        <div style={{flex:1}}></div>
        <div className={postStyles.date}>{timeDifference(Date.now(), post.timestamp)}</div>
      </div>
      <div className={postStyles.postCaption}>{post.caption}</div>
    </div>
  );
}

