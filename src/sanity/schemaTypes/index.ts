import { type SchemaTypeDefinition } from "sanity";
import faq from "./faq";
import review from "./review";
import imageeffect from "./imageeffect";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faq, review, imageeffect, siteSettings],
};
