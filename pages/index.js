import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
    console.log(posts)
    return (
        <>
            <Head>
                <title>Next Markdown Blog</title>
                <meta name="description" content="Next markdown blog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Home</h1>
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