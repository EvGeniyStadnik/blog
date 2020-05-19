import Layout from "../../components/layout";
import Head from 'next/Head'
import {getAllPostIds} from "../../lib/postsNames";
import {getPostById} from "../../lib/post";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const postData = await getPostById(params.id) // { title: '...', date: '...', id: '...' } ; params.id -> ssg-ssr
  return {
    props: { postData }
  }
}

export async function getStaticPaths(data) {
  console.log('data from getStaticPaths: ', data)
              // await getAllPostIds() -> it can fetch external data
  const paths = getAllPostIds() // [{ params: {id: 'ssg-ssr'}},{params: {id: 'pre-rendering'}}]
  return {
    paths,
    fallback: false
  }
}
