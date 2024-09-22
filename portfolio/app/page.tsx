import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

import { MDXRemote } from 'next-mdx-remote/rsc';

export default function Home() {
  const content = `
  `;

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Intro />
        <MDXRemote source={content} />
        <RecentPosts />
        <RecentProjects />

        <NewsletterForm />
      </div>
    </section>
  )
}