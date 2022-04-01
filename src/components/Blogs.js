import BlogPost from "./BlogPost";
import posts from "../blog/posts.js"

export default function Blogs() {


  return (
      <div className='blog'>
        {Object.entries(posts).map(function(post, i) {
          return <BlogPost key={i} url={post[0]} {...post[1]} full={false}/>
        })}
      </div>
  );
}

