import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import posts from "../blog/posts.js"

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export default function BlogPost(props) {
  const [post, setPost] = useState('');
  const blogPost = posts[props.url]

  useEffect(() => {
    import(`../blog/drafts/${props.url}.md`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => {
            res = props.full ? res : res.split('\n').slice(0, blogPost.cutoff).join('\n');
            setPost(res)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  var readMore;
  if (!props.full) {
    readMore = <a href={"blog\\" + props.url}>Read More</a>;
  }

  return (
    <div className="blog-post section">
      <h1>{blogPost.title}</h1>
      <div className="blog-header">
        <p>Original Publish Date: {blogPost.date}</p>
        <p>Topics: 
          {blogPost.tags.map((tag, i) => {
            const comma = i === 0 ? " " : ", "
            return <span>{comma}{tag}</span>
          })}
        </p>
      </div>
      <hr />
      <ReactMarkdown 
        escapeHtml={false} 
        transformImageUri={uri =>
          uri.startsWith("http") ? uri : `${"http://localhost:3000"}${uri}`
        }
        components={CodeBlock}>
        {post}
      </ReactMarkdown>

      {readMore}
    </div>
  );
}