import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Lead Form Settings')
        .child(
          S.document()
            .schemaType('leadFormSettings')
            .documentId('leadFormSettings')
        ),
      S.listItem()
        .title('Discount Step Form')
        .child(
          S.document()
            .schemaType('discountStepSettings')
            .documentId('discountStepSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'leadFormSettings', 'discountStepSettings'].includes(listItem.getId() as string)
      ),
    ])
