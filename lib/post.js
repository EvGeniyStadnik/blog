import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getPostById(id) {

  const postsDirectory = path.join(process.cwd(), 'posts'); // /Users/evgeniy/Документы/LRN/Tutorials/nextJs/nextjs-blog/posts

  const targetPostPath = path.join(postsDirectory, `${id}.md`);
  const targetPostData = fs.readFileSync(targetPostPath, 'utf8')

  const targetPostMatterData = matter(targetPostData); // {content: '...', data: { title: '...', date: '...' }, isEmpty: false, excerpt: '', orig: <Buffer 2d...}

  const processedContent = await remark()
    .use(html)
    .process(targetPostMatterData.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...targetPostMatterData.data
  }
}