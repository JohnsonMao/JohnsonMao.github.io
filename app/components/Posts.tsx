import { getSortedPostsData } from '@/lib/posts'

function Posts() {
    const posts = getSortedPostsData();

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
            <ul className="w-full">
                {
                    posts.map(post => (
                        <li key={post.id} className="my-4 text-2xl dark:text-white">
                            {post.title}
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default Posts
