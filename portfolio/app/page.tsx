import Intro from '@/components/home/intro'
import NewsletterForm from '@/components/home/newsletter-form'
import RecentPosts from '@/components/posts/recent-posts'
import RecentProjects from '@/components/projects/recent-projects'

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