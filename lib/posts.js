import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts') // /Users/evgeniy/Документы/LRN/Tutorials/nextJs/nextjs-blog/posts

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory) //  [ 'pre-rendering.md', 'ssg-ssr.md' ]

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '') // 'pre-rendering'

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName) //  /Users/evgeniy/Документы/LRN/Tutorials/nextJs/nextjs-blog/posts/pre-rendering.md
    const fileContents = fs.readFileSync(fullPath, 'utf8') // file text

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) // {content: '...', data: { title: '...', date: '...' }, isEmpty: false, excerpt: '', orig: <Buffer 2d...}

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}