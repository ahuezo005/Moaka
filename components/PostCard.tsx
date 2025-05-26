"use client";

import Link from 'next/link';
import { MouseEvent, FormEvent } from 'react';

interface Author {
  username: string;
}

interface Topic {
  slug: string;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  media_url: string | null;
  tag: string | null;
  score: number;
  replies_count: number;
  author: Author;
  topic: Topic;
}

interface PostCardProps {
  post: Post;
}

const copyToClipboard = (element: HTMLElement) => {
  const url = element.getAttribute('data-post-url');
  const originalText = element.textContent;

  if (!url) {
    console.error('No post URL found on element');
    return;
  }

  function updateTextWithFade(newText: string) {
    element.style.opacity = '0.5';
    setTimeout(() => {
      if (element) {
        element.textContent = newText;
        element.style.opacity = '1';
      }
    }, 200);
  }

  navigator.clipboard.writeText(url)
    .then(() => {
      updateTextWithFade('Copied!');
      setTimeout(() => {
        updateTextWithFade(originalText || 'Share');
      }, 3000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
};


export default function PostCard({ post }: PostCardProps) {
  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    console.log(`Voted ${voteType} for post ${post.id}`);
    // Requires API implementation
  };

  let fullPostUrl = '';
  if (typeof window !== 'undefined') {
    fullPostUrl = `${window.location.protocol}//${window.location.host}/post/${post.id}?origin=feed`;
  } else {
    fullPostUrl = `/post/${post.id}?origin=feed`;
  }


  return (
    <article className="content-card">
      {post.media_url ? (
        <Link href={`/post/${post.id}?origin=feed`}>
          <span className="card-image-link" style={{cursor: 'pointer'}}>
            <img
              src={post.media_url.startsWith('http') ? post.media_url : `/uploads/${post.media_url}`}
              alt={`Image for ${post.title}`}
              className="card-image"
            />
          </span>
        </Link>
      ) : (
        <div className="card-no-image"></div>
      )}
      <div className="card-content">
        <h3>
          <Link href={`/post/${post.id}?origin=feed`}>
            {post.title}
          </Link>
        </h3>
        <p className="post-meta">
          By <Link href={`/user/${post.author.username}`}>{post.author.username}</Link>
          {' in '}
          <Link href={`/topic/${post.topic.slug}`}>{post.topic.name}</Link>
          <br />
          {new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="post-content-snippet">
          {post.content.replace(/<[^>]+>/g, '').substring(0, 100)}{post.content.length > 100 ? '...' : ''}
        </p>
        <div className="post-interactions">
          <div className="vote-controls">
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); handleVote('upvote'); }} className="vote-form-inline">
              <button type="submit" aria-label="Upvote">👍</button>
            </form>
            <span className="vote-score">{post.score}</span>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); handleVote('downvote'); }} className="vote-form-inline">
              <button type="submit" aria-label="Downvote">👎</button>
            </form>
          </div>
          <Link href={`/post/${post.id}?origin=feed#replies`} className="view-replies-link">
            {post.replies_count} Replies
          </Link>
        </div>
        <div className="mt-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {post.tag ? (
            <span className="post-tag-badge">{post.tag}</span>
          ) : (
            <span></span>
          )}
          <span
            className="share-link"
            style={{ cursor: 'pointer', color: '#689f38', transition: 'opacity 0.3s ease-in-out' }}
            data-post-url={fullPostUrl}
            onClick={(e: MouseEvent<HTMLSpanElement>) => copyToClipboard(e.currentTarget)}
          >
            Share
          </span>
        </div>
      </div>
    </article>
  );
}