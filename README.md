# shield44's Portfolio

A bold, animated portfolio site built with Next.js, React, TypeScript, and Tailwind CSS, plus a dedicated Blogs page for ROM dev notes.

## 🚀 Features

- **Animated UI**: Gradient backgrounds, glow effects, and Framer Motion transitions
- **Responsive Navbar**: Smooth scrolling for sections + a dedicated Blogs route
- **Live Clock**: Real-time clock display in the navbar
- **Project Showcase**: Detailed ROM development highlights and download links
- **Videos & Sponsor**: Media section and support options
- **Contact & Socials**: Contact form and social profile links
- **Blogs Page**: Template-driven blog cards aligned with the main UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with automatic deployment

## 📱 Sections

- **Home**: Animated hero section with gradient text
- **About**: Personal information with GitHub stats
- **Projects**: ROM development projects and contributions  
- **Videos**: Manim and Blender animation showcase
- **Sponsor**: Support options with animated elements
- **Contact**: Contact form and social media links
- **Blogs**: Separate page for blog templates and future posts

## ✍️ Editing Blog Templates

Edit the blog templates in [src/app/blogs/page.tsx](src/app/blogs/page.tsx). Each entry includes:

- `title`: Post headline
- `excerpt`: Short teaser
- `date`: Publish date string
- `readTime`: Estimated reading time
- `tags`: Label chips
- `href`: Link to the post (can be `#` until published)
- `status`: Draft/Template/Published

## 🚀 Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## 🔗 Routes

- `/` Main portfolio site
- `/blogs` Blog templates page

## 📦 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

## 📄 License

© 2025 shield44. All rights reserved. Content is protected under copyright law.