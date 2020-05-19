import Head from 'next/head'
import Link from 'next/Link'

import Layout, { siteTitle } from '../components/layout'
import {getSortedPostsData} from '../lib/posts';
import utilStyles from '../styles/utils.module.css'
import Date from "../components/date";

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>This is me</p>
        <p>
          <a href="https://nextjs.org/learn">Next.js tutorial</a>
        </p>
        <h1>
          Read <Link href='/posts/first-post'><a>This page</a></Link>
        </h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href='/posts/[id]' as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}