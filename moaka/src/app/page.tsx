import PostCard from '../../../components/PostCard'; // Adjust path
import Link from 'next/link';
import { FormEvent } from 'react'; // For typing event handlers if needed

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

async function getPosts(sort: string = 'recent'): Promise<Post[]> {
  // Replace with API later tbh
  console.log(`Workspaceing posts with sort: ${sort}`);
  // Mock data
  return [
    {
      id: 1,
      title: 'My First Next.js Post',
      content: 'testing posting',
      timestamp: new Date().toISOString(),
      media_url: 'placeholder-image.jpg',
      tag: 'Next.js',
      score: 10,
      replies_count: 5,
      author: { username: 'nextjsfan' },
      topic: { slug: 'nextjs-learning', name: 'Next.js Learning' },
    },
    {
      id: 2,
      title: 'Understanding Components',
      content: 'Components are the building blocks of React applications. This card is a component!',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      media_url: null,
      tag: 'React',
      score: 22,
      replies_count: 3,
      author: { username: 'reactdev' },
      topic: { slug: 'react-basics', name: 'React Basics' },
    },
  ];
}

interface HomePageProps {
  searchParams: {
    sort?: string;
    query?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const currentSort = searchParams?.sort || 'recent';
  const posts = await getPosts(currentSort);
  const pageTitle = currentSort === 'popular' ? "Most Popular Posts" : "Latest Posts";

  return (
    <div className="main-content-inner-container">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link href="/home">
          <img src="/assets/Bobcat_board_text_logo.png" alt="Bobcat Board" style={{ maxWidth: '350px', cursor: 'pointer' }} />
        </Link>
      </div>

      <h1 className="mb-2">{pageTitle}</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <form method="GET" action="/home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="sort" className="text-muted" style={{ whiteSpace: 'nowrap', marginBottom: 0 }}>Sort by:</label>
          <select
            name="sort"
            id="sort"
            defaultValue={currentSort}
            className="form-select-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
           <button type="submit" className="btn btn-sm btn-secondary">Sort</button>
        </form>

        <form action="/search" method="get" style={{ width: 'auto', display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
            <input type="text" name="query" placeholder="Search posts..." defaultValue={searchParams?.query || ''} style={{ borderRadius: '25px' }}/>
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {posts && posts.length > 0 ? (
        <div className="feed-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div>
            <Link href="/topics">
              <button type="button" className="footer-button">+</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flash info">
          No posts have been made yet. Be the first to create one!
        </div>
      )}
    </div>
  );
}