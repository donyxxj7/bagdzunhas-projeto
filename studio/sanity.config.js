// studio/sanity.config.js

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// Importe seus schemas aqui
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'bagdzunhas-site',

  projectId: 'u9210xqd', // Mantenha o seu projectId que já está aí
  dataset: 'production', // Mantenha o seu dataset

  plugins: [structureTool(), visionTool()],

  schema: {
    // Registre os schemas aqui
    types: schemaTypes,
  },
})