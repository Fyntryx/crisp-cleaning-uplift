import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'googleReviewCount',
      title: 'Google Review Count',
      type: 'number',
      description: 'The number of verified Google reviews to display on the landing page.',
      initialValue: 14,
    }),
  ],
})
