import fs from 'fs'
import path from 'path'

export function getAllPostIds() {
  const postsDirectory = path.join(process.cwd(), 'posts') // /Users/evgeniy/Документы/LRN/Tutorials/nextJs/nextjs-blog/posts
  const fileNames = fs.readdirSync(postsDirectory) //  [ 'pre-rendering.md', 'ssg-ssr.md' ]

  return fileNames.map(fileName => { // [{ params: {id: 'ssg-ssr'}},{params: {id: 'pre-rendering'}}]
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

// export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
//   const res = await fetch('..')
//   const posts = await res.json()
//   return posts.map(post => {
//     return {
//       params: {
//         id: post.id
//       }
//     }
//   })
// }