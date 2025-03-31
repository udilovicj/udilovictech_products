# Udilovic Tech Website

A modern, developer-focused website for Udilovic Tech built with Next.js, TypeScript, TailwindCSS, Framer Motion, and GSAP.

## Features

- Modern UI with custom animations and designs
- Responsive design that works on all devices
- Custom animated components with Framer Motion and GSAP
- Fast performance with Next.js
- Type-safe code with TypeScript
- Tailwind CSS for styling

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Getting Started

### Quick Setup

Run the setup script to automatically install dependencies and configure the project:

```bash
chmod +x setup-project.sh
./setup-project.sh
```

Then run the development server:

```bash
npm run dev
```

### Manual Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/udilovic-tech.git
cd udilovic-tech
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Troubleshooting TypeScript Errors

If you encounter TypeScript errors related to missing modules or JSX elements:

1. Make sure you have the correct types installed:
   ```bash
   npm install --save-dev @types/react @types/react-dom @types/node
   ```

2. Check that the `src/lib/react-app-env.d.ts` file exists and has the proper type declarations.

## Project Structure

- `src/app/`: Next.js app router files
- `src/components/`: React components
- `src/lib/`: Utility functions and helpers
- `public/`: Static assets

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)

## Deployment

To build the project for production:

```bash
npm run build
```

Then, you can start the production server:

```bash
npm run start
```

## License

This project is licensed under the MIT License. 