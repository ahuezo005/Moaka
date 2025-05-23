import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard'; // Adjust path
// import ClientLayoutLogic from '../../components/ClientLayoutLogic'; // Assuming this wraps children in root layout

async function getPosts(sort = 'recent') {
  // Replace with  API call when replemented

  // Mock data
  return [
    {
      id: 1,
      title: 'My First Next.js Post',
      content: 'testing posting',
      timestamp: new Date().toISOString(),
      //   PLACEHOLDERS
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
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      media_url: null,
      tag: 'React',
      score: 22,
      replies_count: 3,
      author: { username: 'reactdev' },
      topic: { slug: 'react-basics', name: 'React Basics' },
    },
  ];
}

export default async function HomePage({ searchParams }) {
  const currentSort = searchParams.sort || 'recent';
  const posts = await getPosts(currentSort);
  const pageTitle = currentSort === 'popular' ? "Most Popular Posts" : "Latest Posts";

  //need to reimplement search logic due to transfer

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link href="/home">
          <img src="/assets/Bobcat_board_text_logo.png" alt="Bobcat Board" style={{ maxWidth: '350px', cursor: 'pointer' }} />
        </Link>
      </div>

      <h1 className="mb-2">{pageTitle}</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <form method="GET" action="/home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="sort" className="text-muted" style={{ whiteSpace: 'nowrap', marginBottom: 0 }}>Sort by:</label>
          <select name="sort" id="sort" defaultValue={currentSort} onChange={(e) => {

              e.target.form.submit();
          }} className="form-select-sm">
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </form>

        {/* need to reimplement api for search calls */}
        <form action="/search" method="get" style={{ width: '363px', display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
            <input type="text" name="query" placeholder="Search posts..." defaultValue={searchParams.query || ''} style={{ borderRadius: '25px' }}/>
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
    </>
  );
}