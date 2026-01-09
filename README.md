# Social Media Impact Visualizer

**Live Site:** https://social-media-distractions.netlify.app/

A browser-based data visualization tool that shows social media usage statistics and distraction rates by age group.

## Features

- **Age-Based Statistics**: Enter your age (13-99) to see relevant data for your age group
- **Gender Filtering**: Optional gender selection for more personalized statistics
- **Platform Breakdown**: Visual breakdown of time spent on TikTok, Instagram, Snapchat, and Facebook
- **Animated Charts**: Engaging animations with Chart.js
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop (320px - 1920px+)
- **Dark/Light Mode**: Automatic theme detection based on system preferences
- **Accessible**: WCAG 2.1 AA compliant with ARIA labels and touch-friendly targets

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, responsive design
- **JavaScript (ES6+)** - Module pattern, async/await
- **Chart.js v4.4.1** - Data visualization
- **Google Fonts (Poppins)** - Typography

## Local Development

1. Clone the repository
2. Start a local web server from the project root:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000/public/` in your browser

## Deployment to Netlify

### Option 1: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect the `netlify.toml` settings
6. Click "Deploy site"

The `netlify.toml` file is already configured to:
- Publish from the `public/` directory
- Set up caching headers for performance
- Configure security headers

## Project Structure

```
social_media_distractions/
├── public/                  # Static site files (deployed)
│   ├── index.html          # Main page
│   ├── data-sources.html   # Research citations page
│   ├── favicon.svg         # Site icon
│   ├── data/
│   │   └── statistics.json # Age group data
│   ├── scripts/
│   │   ├── main.js         # Entry point & form handling
│   │   ├── stats.js        # Data loading & processing
│   │   ├── visualizations.js # Charts & animations
│   │   └── theme.js        # Dark/light mode
│   └── styles/
│       ├── theme.css       # CSS custom properties
│       └── main.css        # Layout & components
├── docs/                    # Documentation
│   ├── data-sources.md     # Research citations
│   └── TESTING.md          # Manual testing checklist
├── specs/                   # Design documents
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```

## Data Sources

All statistics are compiled from reputable research sources including:
- Pew Research Center
- Statista
- Common Sense Media
- Academic peer-reviewed studies

See the [data sources page](public/data-sources.html) for full citations.

## License

This is an educational project. Data sources retain their original copyrights.
