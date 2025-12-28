// schemas/image.js
export default {
  name: "Imageeffect",
  title: "Imageeffect Section (Floating Images)",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      description: "e.g. Your clean happy space is just one click away",
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get a quote",
    },
    {
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      initialValue: "/contact",
    },
    {
      name: "floatingImages",
      title: "Floating Images",
      type: "array",
      description: "Add exactly 8 images for the best design result.",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", options: { hotspot: true } },
            { name: "label", type: "string", title: "Hover Label" },
          ],
        },
      ],
    },
  ],
};
