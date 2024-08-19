import { getPostDetails } from "@/services";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const post = await getPostDetails(slug);

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching post details:", error.message);
    return new Response(
      JSON.stringify({ error: `Error fetching post details: ${error.message}` }),
      {
        status: 500,
      }
    );
  }
}
