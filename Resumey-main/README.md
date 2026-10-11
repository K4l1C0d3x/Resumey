<div align="center">

# Resumey

### Build a stronger resume. Apply with confidence.

An AI-powered resume builder that helps job seekers create professional, ATS-friendly resumes, improve their content, and export polished documents.

<p>
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

</div>

## Overview

Resumey is a full-stack web application for creating, managing, and improving resumes. It combines a guided resume editor with ATS analysis, AI-assisted content generation, job matching, templates, and PDF export.

## Features

- **Resume builder** - Create and edit personal information, summaries, experience, education, projects, skills, and certifications.
- **AI-assisted writing** - Generate and improve resume content with AI-powered suggestions.
- **ATS scoring** - Analyze resume content against Applicant Tracking System best practices.
- **Job matching** - Compare resume skills with job requirements and identify gaps.
- **Professional templates** - Choose from multiple resume layouts designed for readability and ATS compatibility.
- **PDF export** - Download a finished resume in a print-ready format.
- **Secure authentication** - Sign up, sign in, and manage sessions with Supabase Auth.
- **Persistent storage** - Save and manage resumes with Supabase.
- **Responsive interface** - Use the application on desktop and mobile screens.

## Tech stack

- **Frontend:** Next.js App Router, React, TypeScript
- **Styling:** Tailwind CSS, Radix UI, shadcn/ui patterns
- **Authentication and database:** Supabase Auth and PostgreSQL
- **AI:** Google Generative AI
- **Document processing:** PDF.js and `pdf-parse`
- **Forms and validation:** React Hook Form and Zod
- **Charts and analytics:** Recharts
- **Testing:** Cypress

## Getting started

### Prerequisites

- Node.js 18.18 or later
- pnpm
- A Supabase project
- A Google Generative AI API key, if using AI features

### Installation

```bash
git clone https://github.com/K4l1C0d3x/Resumey.git
cd Resumey/Resumey-main
pnpm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key
```

Never commit `.env.local` or API keys to the repository.

### Database setup

1. Create a project in [Supabase](https://supabase.com/).
2. Open the Supabase SQL Editor.
3. Run the SQL migration in [`scripts/001_create_resumes.sql`](./scripts/001_create_resumes.sql).
4. Copy the project URL and anon key into `.env.local`.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm exec cypress open` | Open the Cypress test runner |

## Project structure

```text
Resumey/
├── app/                  # Pages, layouts, and API routes
├── components/           # Reusable React and UI components
├── lib/                  # ATS, AI, resume, and export logic
├── utils/supabase/       # Supabase browser, server, and middleware clients
├── public/               # Static assets
├── scripts/              # Database migrations
├── README.md             # Project documentation
└── package.json          # Dependencies and scripts
```

## Documentation

- [Technical documentation](./DOCUMENTATION.md)
- [ER diagram and data-flow documentation](./ER_DIAGRAM.md)
- [Resume templates and PDF export](./README-TEMPLATES.md)
- [Project report](./PROJECT_REPORT.md)
- [Presentation](./PPT_PRESENTATION.md)

## Security notes

- Keep Supabase and AI credentials in environment variables.
- Do not expose service-role keys in client-side code.
- Use Supabase Row Level Security policies to protect user-owned resume data.
- Validate user input on both the client and server.

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and run the relevant checks:

   ```bash
   pnpm lint
   pnpm build
   ```

4. Commit your changes and open a pull request.

## License

This project is currently intended for academic and educational use. Add a license file if you plan to distribute or reuse it publicly.
