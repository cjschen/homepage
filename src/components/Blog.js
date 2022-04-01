import BlogPost from "./BlogPost";
import posts from "../blog/posts.js"
import { useParams } from "react-router";

export default function Blogs() {
  let { id } = useParams()

  return ( <div className="blog">
    <BlogPost url={id} {...posts[id]} full={true}/>

  </div>
  );
}

