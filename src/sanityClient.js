// src/sanityClient.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'u9210xqd', // Cole seu Project ID aqui
  dataset: 'production',
  apiVersion: '2025-10-21', // Use a data de hoje
  useCdn: true, 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);