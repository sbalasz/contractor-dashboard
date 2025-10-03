# Contractor Dashboard

A modern, responsive contractor management dashboard built with Next.js, React, and Tailwind CSS.

## Features

- 📊 **Contractor Management**: Add, edit, and delete contractor visits
- 📅 **Calendar View**: Visual calendar with contractor visits and tooltips
- 📈 **Analytics Dashboard**: Charts and metrics for contractor performance
- 🎨 **Modern UI**: Clean, responsive design with dark/light theme support
- 📱 **Mobile Friendly**: Optimized for all device sizes
- 🔍 **Search & Filter**: Find contractors quickly
- 📅 **Date Pickers**: Interactive calendar date selection
- 💡 **Tooltips**: Hover for detailed contractor information

## Live Demo

**[View Live Demo on GitHub Pages](https://yourusername.github.io/contractor-dashboard)**

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contractor-dashboard.git
   cd contractor-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Update contractor dashboard"
   git push origin main
   ```

2. **GitHub Actions will automatically:**
   - Build the project
   - Deploy to GitHub Pages
   - Update the live site

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Push the dist folder to gh-pages branch**
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## Configuration

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on every push to main

### Custom Domain (Optional)

To use a custom domain:

1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Create a `CNAME` file in the `public` folder with your domain
3. Configure DNS settings with your domain provider

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Deployment**: GitHub Pages + GitHub Actions

## Project Structure

```
contractor-dashboard/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── contractor-table.tsx
│   ├── calendar-view.tsx
│   └── analytics-dashboard.tsx
├── lib/                   # Utility functions and types
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions
└── dist/                  # Build output (auto-generated)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).