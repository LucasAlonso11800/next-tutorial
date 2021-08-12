import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Link from 'next/link';

export default function PostPage({ slug, frontmatter, content }) {
    return (
        <>
            <Link href="/">
                <a className="btn btn-back">Back to Home</a>
            </Link>
            <div className="card card-page">
                <h1 className="post-title">{frontmatter.title}</h1>
                <div className="post-date">Posted on {frontmatter.date}</div>
                <img src={frontmatter.cover_image} alt="image" />
                <div className="post-body">
                    <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
                </div>
            </div>
        </>
    )
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));
    const paths = files.map(file => ({
        params: {
            slug: file.replace('.md', '')
        }
    }))
    return {
        paths,
        fallback: false
    }
};

export async function getStaticProps({ params: { slug } }) {
    const md = fs.readFileSync(path.join('posts', slug + '.md'), 'utf8');
    const { data: frontmatter, content } = matter(md)

    return {
        props: {
            slug,
            frontmatter,
            content
        }
    }
};