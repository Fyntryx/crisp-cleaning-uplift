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
    defineField({
      name: 'googleRatingValue',
      title: 'Google Rating Value',
      type: 'number',
      description: 'The average Google rating to display across the site (e.g., 4.9).',
      initialValue: 4.9,
      validation: (rule) => rule.min(1).max(5).precision(1),
    }),
  ],
})
