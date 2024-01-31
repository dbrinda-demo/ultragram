import styles from './PostAlbum.module.less';
import postStyles from '../PostList/Post.module.less';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {timeDifference} from "../../common/dates.js";

function genImageList(images) {
  return images.map(url => {
    return (
      <img src={url} key={url} />
    )
  })
}

export default function PostAlbum({ post }) {
  return (
    <div className={postStyles.post}>
      <Carousel className={styles.carousel} showArrows={true} showThumbs={false}>
        {genImageList(post.albumUrls || [post.mediaUrl])}
      </Carousel>
      <div className={postStyles.info}>
        <div className={postStyles.likes}>Likes: {post.likeCount}</div>
        <div style={{flex:1}}></div>
        <div className={postStyles.date}>{timeDifference(Date.now(), post.timestamp)}</div>
      </div>
      <div className={postStyles.postCaption}>{post.caption}</div>
    </div>
  );
}

