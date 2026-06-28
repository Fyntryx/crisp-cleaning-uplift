export default {
  name: 'leadFormSettings',
  title: 'Lead Form',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heading',
      title: 'Form Heading',
      type: 'string',
      description: 'e.g. "Get an Instant Quote"'
    },
    {
      name: 'subheading',
      title: 'Form Subheading',
      type: 'text',
      rows: 2,
      description: 'e.g. "Fixed pricing. Same cleaner every visit."'
    }
  ]
};
