"use client"

import { TemplateSelector } from '@/components/template-selector'
import { ResumeFormData } from '@/components/resume/resume-form'

const showcaseResume: ResumeFormData = {
  id: 'tony-stark-demo',
  title: 'Tony Stark',
  domain: 'Full Stack Development',
  personalInfo: {
    fullName: 'Tony Stark',
    email: 'tony.stark123@example.com',
    phone: '+1 555-123-4567',
    location: 'City, Country',
    summary:
      'Computer Science undergraduate with hands-on experience in Full Stack Web Development and AI application development. Proficient in React.js, NestJS, Python, and MySQL. Leadership experience, hackathon achievements, and internship experience. Seeking a Full Stack Developer Internship.',
  },
  objective: 'To contribute as a full stack developer while building practical products with modern web and AI technologies.',
  skills: [
    'JavaScript',
    'Python',
    'C++',
    'C',
    'React.js',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'NestJS',
    'REST APIs',
    'MongoDB',
    'MySQL',
    'Git',
    'GitHub',
    'VS Code',
    'Postman',
    'Vercel',
    'Figma',
    'DSA',
    'DBMS',
    'OS',
    'Computer Networks',
    'SDLC',
  ],
  education: [
    {
      id: 'tony-edu-1',
      school: 'Example University',
      degree: 'B.Tech in Computer Science and Engineering',
      field: 'Computer Science',
      startYear: '2023',
      endYear: '2027',
    },
  ],
  experience: [
    {
      id: 'tony-exp-1',
      company: 'Example Technologies Company',
      position: 'Software Development Engineering Intern',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      description: 'Built and maintained responsive web pages. Collaborated with cross-functional teams.',
    },
  ],
  certificates: [],
  internships: [],
  projects: [
    {
      id: 'tony-proj-1',
      title: 'AI-Powered Resume Builder',
      description:
        'Developed a full-stack AI resume builder using React.js, NestJS, TypeScript, Google Generative AI, Tailwind CSS, and Vercel. Reduced resume creation time through AI-assisted content generation.',
      technologies: 'React.js, NestJS, TypeScript, Google Generative AI, Tailwind CSS, Vercel',
    },
  ],
  presentations: [],
  achievements: [
    {
      id: 'tony-ach-1',
      title: '2nd Place Hackathon Winner',
      description: 'Recognized for building a strong solution during a competitive hackathon.',
    },
    {
      id: 'tony-ach-2',
      title: 'Student Branch Treasurer',
      description: 'Held a student leadership role with organizational responsibilities.',
    },
    {
      id: 'tony-ach-3',
      title: 'NASA Space Apps Challenge Participant',
      description: 'Participated in the NASA Space Apps Challenge three times.',
    },
  ],
  extracurricular: [],
  languages: ['English', 'Malayalam'],
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Templates</h1>
        <TemplateSelector resumeData={showcaseResume} />
      </div>
    </div>
  )
}
