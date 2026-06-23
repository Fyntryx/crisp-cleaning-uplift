import { defineField, defineType } from "sanity";

export const suburbImage = defineType({
  name: "suburbImage",
  title: "Suburb Images",
  type: "document",
  fields: [
    defineField({
      name: "suburbName",
      title: "Suburb Name (e.g., Doncaster)",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Enter the exact name of the suburb this image is for.",
    }),
    defineField({
      name: "mainImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: "Upload the specific image for this suburb's hero section.",
    }),
  ],
  preview: {
    select: {
      title: "suburbName",
      media: "mainImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Unnamed Suburb Image",
        media,
      };
    },
  },
});
