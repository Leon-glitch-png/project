# ImageKit Video Shop

A modern Next.js application for managing and uploading video content using ImageKit integration. This project includes user authentication and Prisma ORM for database management.

## Features

- 🔐 User Authentication (NextAuth.js)
- 📹 Video Upload and Management (ImageKit)
- 🎨 Modern UI with Tailwind CSS and DaisyUI
- 📱 Fully Responsive Design
- 🔒 Secure API Routes
- 🗄️ Database Integration with Prisma and MongoDB

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: NextAuth.js, JWT
- **Database**: Prisma ORM with MongoDB
- **File Storage**: ImageKit
- **Form Handling**: React Hook Form

## Prerequisites

- Node.js (Latest LTS version)
- MongoDB Database
- ImageKit Account

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Leon-glitch-png/project.git
cd things
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
    - Copy `.env.example` to `.env`
    - Fill in the required environment variables

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── public/            # Static assets
├── src/
│   ├── app/           # Application pages
│   ├── components/    # Reusable components
│   ├── db/            # Prisma ORM setup
│   ├── lib/           # Utility functions
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
├── tsconfig.json      # Typescript  configuration
├── middleware.ts      # Middleware setup

```

## Contributing

Feel free to submit issues or contribute by making pull requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

