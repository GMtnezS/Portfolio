import Intro from '@/components/home/intro'
// import NewsletterForm from '@/components/home/newsletter-form'
// import RecentPosts from '@/components/posts/recent-posts'
// import RecentProjects from '@/components/projects/recent-projects'

import { MDXRemote } from 'next-mdx-remote/rsc';
import ContactFormWrapper from './contact/wrapper';

export default function Home() {
  const content = `
  `;

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Intro />
        <MDXRemote source={content} />
        {/* <RecentPosts /> */}
        {/* <RecentProjects /> */}
        <ContactFormWrapper />
        {/* <NewsletterForm /> */}
      </div>
    </section>
  )
}