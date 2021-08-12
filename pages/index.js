import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '../components/Post';

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <title>Next Markdown Blog</title>
                <meta name="description" content="Next markdown blog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="posts">
                {posts.map(post => <Post post={post} />)}
            </div>
        </>
    )
};

export function getStaticProps() {
    const files = fs.readdirSync(path.join('posts'))

    const posts = files.map(file => {
        const slug = file.replace('.md', '');
        const md = fs.readFileSync(path.join('posts', file), 'utf-8');
        const { data: frontmatter } = matter(md)
        return { slug, frontmatter }
    });

    return {
        props: { posts }
    }
};