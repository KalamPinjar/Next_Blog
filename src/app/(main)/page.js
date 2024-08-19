
import { PostCard, Categories, PostWidget } from "@/components";
import Stars from "@/components/Stars";
import FeaturedPosts from "@/section/FeaturedPosts";
import { getPosts } from "@/services";

export const revalidate = 0;
export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="container mx-auto px-10 mb-8">
      <Stars />
      <FeaturedPosts/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
