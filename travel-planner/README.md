# Travel Planner App

Um aplicativo moderno e responsivo para organizar roteiros de viagem em família.

## 🚀 Características

- ✨ **Interface Intuitiva**: Design limpo e moderno, otimizado para telemóvel e desktop
- 🗺️ **Mapa Interativo**: Visualize todos os locais no mapa com filtros por categoria
- 📍 **Gestão de Locais**: Adicione, edite e organize locais de interesse
- 📸 **Galeria de Fotos**: Carregue fotos de cada local
- ⭐ **Favoritos**: Marque seus locais favoritos
- ✅ **Checklist**: Organize itens para levar
- 📝 **Notas e Dicas**: Guarde informações importantes
- 📊 **Estatísticas**: Acompanhe seu progresso
- 📤 **Exportar**: Exporte em JSON ou PDF
- 🔍 **Busca**: Pesquise rápidamente locais

## 🏗️ Estrutura do Projeto

```
travel-planner/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── locations/
│   │   │   ├── AddLocationModal.tsx
│   │   │   └── LocationCard.tsx
│   │   ├── map/
│   │   │   └── InteractiveMap.tsx
│   │   └── gallery/
│   │       └── PhotoGallery.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LocationsPage.tsx
│   │   ├── MapPage.tsx
│   │   ├── ChecklistPage.tsx
│   │   ├── NotesPage.tsx
│   │   ├── AddTripPage.tsx
│   │   ├── EditTripPage.tsx
│   │   └── SettingsPage.tsx
│   ├── store/
│   │   └── travelStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
cd travel-planner
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 📦 Build

Para criar um build de produção:

```bash
npm run build
```

## 🎨 Categorias de Locais

- 🏛️ Monumentos
- 🏖️ Praias
- 🍽️ Restaurantes
- 🎭 Atividades
- 🏨 Alojamento
- 🛍️ Compras
- 🌿 Natureza

## 💾 Armazenamento

Os dados são armazenados localmente no navegador usando `localStorage`. Exporte regularmente suas viagens para não perder os dados.

## 📝 Funcionalidades Principais

### Viagens
- Criar múltiplas viagens
- Editar informações da viagem
- Eliminar viagens

### Locais
- Adicionar locais com coordenadas GPS
- Carregar múltiplas fotos
- Adicionar descrição, morada, horários e preços
- Avaliar pessoalmente (1-5 estrelas)
- Marcar como favorito ou visitado
- Link para Google Maps

### Mapa
- Visualizar todos os locais no mapa
- Filtrar por categoria
- Markers coloridos por categoria
- Popups com informações do local

### Checklist
- Organizar por categorias
- Marcar items como concluídos
- Acompanhar progresso

### Notas
- Criar e editar notas
- Guardar dicas importantes
- Associar notas à viagem

### Exportação
- Exportar em JSON (importável)
- Exportar em PDF (imprimível)

## 🚀 Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Zustand (State Management)
- Leaflet (Mapas)
- jsPDF (Exportação PDF)
- Lucide React (Ícones)

## 📄 Licença

MIT

## 👤 Autor

afonferr
