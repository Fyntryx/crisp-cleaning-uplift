import { type SchemaTypeDefinition } from "sanity";
import faq from "./faq";
import review from "./review";
import imageeffect from "./imageeffect";
import siteSettings from "./siteSettings";
import { suburbImage } from "./suburbImage";
import leadFormSettings from "./leadFormSettings";
import discountStepSettings from "./discountStepSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faq, review, imageeffect, siteSettings, suburbImage, leadFormSettings, discountStepSettings],
};
