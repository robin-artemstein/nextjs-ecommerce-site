# The Next.js E-commerce Site

The website is built with the following tech stack combination.

- Next.js app router for UI and interaction design
- TypeScript for static typing
- Tailwind for UI styling

## Push to GitHub repository
```
git init
git add .
git commit -m "The Nth commit on date."
git remote rm origin
git branch -M main
git remote add origin git@github.com:robin-artemstein/nextjs-ecommerce-site.git
git push -u origin main
```

## Installation

Install Bun first

https://bun.sh

Then install dependencies:
```
bun install
bun dev
```
## Project structure
```
nextjs-ecommerce-site/
├── next.config.js             # Configuration for external product images
├── app/
│   ├── types.ts               # Shared TypeScript data blueprints
│   ├── layout.tsx             # Main shell containing Navbar, Footer, and Cart Context
│   ├── page.tsx               # Main Catalog Page (ISR - 60s Revalidation)
│   ├── context/
│   │   └── CartContext.tsx    # State management for your shopping cart
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation header containing the Cart trigger
│   │   ├── CartModal.tsx      # Dropdown overlay showing added cart items
│   │   └── Footer.tsx         # Copyright bottom footer
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx       # Detailed view page for individual items (ISR)
│   └── checkout/
│       └── page.tsx           # Order summary and checkout forms
```
