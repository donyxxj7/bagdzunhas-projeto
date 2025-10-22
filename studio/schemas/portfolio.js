// studio/schemas/portfolio.js
export default {
    name: 'portfolio',
    title: 'Portfólio',
    type: 'document',
    fields: [
      {
        name: 'titulo',
        title: 'Título do Trabalho',
        type: 'string',
        description: 'Ex: Glitter Elegante, Azul Royal',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'imagem',
        title: 'Imagem Principal',
        type: 'image',
        options: {
          hotspot: true, 
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'alt',
        title: 'Descrição da Imagem (Texto Alternativo)',
        type: 'string',
        description: 'Descreva a imagem. Importante para acessibilidade e SEO.',
        validation: (Rule) => Rule.required(),
      },
    ],
  }