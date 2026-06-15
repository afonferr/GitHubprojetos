# 🌍 Travel Planner - Organizador de Roteiros de Viagem em Família

Um site moderno e intuitivo para organizar roteiros de viagem sem estar preso a horários. Explore destinos de forma flexível!

## ✨ Funcionalidades

- 📍 **Adicionar Locais**: Crie uma lista de pontos de interesse
- 🗺️ **Mapa Interativo**: Visualize todos os locais marcados no mapa
- 🏷️ **Filtros por Categoria**: Monumentos, Praias, Restaurantes, Atividades, Alojamento, Compras, Natureza
- ⭐ **Favoritos**: Marque seus locais preferidos
- ✅ **Marcar Visitados**: Acompanhe o progresso da viagem
- 📸 **Galeria de Fotos**: Adicione múltiplas imagens por local
- 📝 **Notas e Dicas**: Espaço para anotações pessoais
- ✓ **Checklist**: Lista de itens para levar
- 🔍 **Pesquisa Rápida**: Encontre locais facilmente
- 📊 **Dashboard**: Estatísticas da viagem (total de locais, visitados, etc.)
- 📥 **Exportar em PDF**: Imprima seu roteiro

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Mapa**: Mapbox GL JS
- **Armazenamento**: localStorage + IndexedDB
- **PDF**: jsPDF + html2canvas
- **Icons**: React Icons

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/afonferr/GitHubprojetos.git
cd travel-planner

# Instale as dependências
npm install

# Configure a chave Mapbox
# Crie um ficheiro .env.local na raiz
VITE_MAPBOX_TOKEN=seu_token_aqui

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🗺️ Obter Token Mapbox

1. Vá para https://www.mapbox.com/
2. Crie uma conta gratuita
3. Copie seu token de acesso público
4. Cole em `.env.local`

## 📁 Estrutura do Projeto

```
travel-planner/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Dashboard/
│   │   ├── LocationCard/
│   │   ├── Map/
│   │   ├── Filters/
│   │   ├── PhotoGallery/
│   │   ├── Checklist/
│   │   ├── Notes/
│   │   └── Modal/
│   ├── context/
│   │   └── TravelContext.jsx
│   ├── hooks/
│   │   ├── useTravelData.js
│   │   ├── useLocalStorage.js
│   │   └── usePDF.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── pdf.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.local.example
```

## 🎨 Design

- Interface limpa e moderna
- Totalmente responsivo (mobile-first)
- Dark mode opcional
- Paleta de cores vibrante e acessível

## 📝 Como Usar

1. **Criar Viagem**: Adicione uma nova viagem
2. **Adicionar Locais**: Clique em "Novo Local"
3. **Preencher Detalhes**: Nome, descrição, morada, fotos, etc.
4. **Visualizar no Mapa**: Veja todos os pontos marcados
5. **Filtrar**: Use categorias para organizar
6. **Marcar Visitados**: Acompanhe o progresso
7. **Exportar**: Gere PDF do seu roteiro

## 🚀 Deploy

```bash
# Vercel (recomendado)
npm install -g vercel
vercel

# Netlify
npm run build
# Faça upload da pasta dist
```

## 📄 Licença

MIT

## 👤 Autor

afonferr

---

**Desenvolvido com ❤️ para viajantes de família!**
