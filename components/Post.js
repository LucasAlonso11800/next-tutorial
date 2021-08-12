import Link from 'next/link';

export default function Post({ post }) {
    const { frontmatter } = post;
    return (
        <div className="card">
            <img src={frontmatter.cover_image} alt="image" />
            <div className="post-date">Posted on {frontmatter.date}</div>
            <h3>{frontmatter.title}</h3>
            <p>{frontmatter.excerpt}</p>
            <Link href={`/blog/${post.slug}`}>
                <a className="btn">Read More</a>
            </Link>
        </div>
    )
};