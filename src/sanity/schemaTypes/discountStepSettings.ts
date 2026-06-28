export default {
  name: 'discountStepSettings',
  title: 'Discount Step Form',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heading',
      title: 'Form Heading',
      type: 'string',
      description: 'e.g. "Claim 15% OFF your FIRST clean!"'
    },
    {
      name: 'subheading',
      title: 'Form Subheading',
      type: 'text',
      rows: 2,
      description: 'e.g. "Enter your details and save!"'
    }
  ]
};
