import { getCategoryPost } from "@/services";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const categoryPost = await getCategoryPost(slug);

    if (!categoryPost) {
      return new Response(JSON.stringify({ error: "CategoryPost not found" }), {
        status: 404,
      });
    }
    if (categoryPost.length === 0) {
      return new Response(JSON.stringify({ error: "No Post found in this category" }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify(categoryPost), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching categoryPost details:", error.message);
    return new Response(
      JSON.stringify({
        error: `Error fetching categoryPost details: ${error.message}`,
      }),
      {
        status: 500,
      }
    );
  }
}
