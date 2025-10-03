# GitHub Pages Deployment Guide

## Quick Setup

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Your site will be live at:**
   ```
   https://yourusername.github.io/contractor-dashboard
   ```

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Push to gh-pages branch**
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## Troubleshooting

### Build Issues
- Make sure Node.js 18+ is installed
- Run `npm install` to ensure all dependencies are installed
- Check that all TypeScript errors are resolved

### Deployment Issues
- Ensure GitHub Actions are enabled in repository settings
- Check the Actions tab for any failed workflows
- Verify the repository name matches the basePath in next.config.mjs

### Custom Domain
To use a custom domain:
1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Create a `CNAME` file in the `public` folder with your domain
3. Configure DNS settings with your domain provider

## File Structure After Build

```
dist/
├── index.html          # Main page
├── 404.html           # Error page
├── _next/             # Next.js assets
├── placeholder-*.png   # Static assets
└── .nojekyll          # Prevents Jekyll processing
```

## Environment Variables

The build process automatically sets:
- `NODE_ENV=production`
- `basePath=/contractor-dashboard` (for GitHub Pages)
- `assetPrefix=/contractor-dashboard` (for GitHub Pages)
