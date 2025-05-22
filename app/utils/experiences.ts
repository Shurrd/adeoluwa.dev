import { Experiences } from '@/types';

export const experiences: Experiences[] = [
  {
    id: 1,
    company: 'Partner Mobile',
    title: 'Software Engineer',
    date: 'Mar 2025',
    descriptions: [
      {
        id: 1,
        description:
          'Designed and developed RESTful APIs using NestJS, enabling seamless communication between the mobile frontend and backend services.',
      },
      {
        id: 2,
        description:
          'Built a scalable backend architecture with NestJS and Docker, improving deployment and service uptime by 40%.',
      },
      {
        id: 3,
        description:
          'Integrated Kafka to manage background tasks and queues, enhancing system throughput by over 50%.',
      },
      {
        id: 4,
        description:
          'Implemented Paystack for secure payment processing and Sentry for real-time monitoring, reducing transaction failures by 30% and cutting bug resolution time by 35%.',
      },
    ],
  },
  {
    id: 2,
    company: 'Booking Corps',
    title: 'Software Engineer',
    date: 'Jul 2024 - Feb 2025',
    descriptions: [
      {
        id: 1,
        description:
          'Collaborated with UI/UX designers and external teams to develop a hotel and shortlet booking platform, increasing user engagement by 25%.',
      },
      {
        id: 2,
        description:
          'Integrated Stripe and Paystack for secure payments, reducing failed transactions by 40% and improving checkout reliability.',
      },
      {
        id: 3,
        description:
          'Conducted internal deployments and testing that enhanced system uptime to 99.9%.',
      },
    ],
  },
  {
    id: 3,
    company: 'Tiqbuy',
    title: 'Software Engineer',
    date: 'Sep 2023 - Jan 2025',
    descriptions: [
      {
        id: 1,
        description:
          'Led migration of the e-commerce platform to a Next.js MedusaJS-powered stack, improving page load speed by 45%.',
      },
      {
        id: 2,
        description:
          'Built real-time dashboards tracking user behavior and product performance, enabling a 35% increase in marketing ROI through better targeting.',
      },
      {
        id: 3,
        description:
          'Supported a cross-functional team of 6 developers and marketers in implementing analytics tools that reduced decision-making time by 20%.',
      },
    ],
  },
  {
    id: 4,
    company: 'Gracetech Group',
    title: 'Lead Software Engineer',
    date: 'Jun 2023',
    descriptions: [
      {
        id: 1,
        description:
          'Spearheaded development of a biometric-based ERP attendance system used by 100+ employees, improving attendance accuracy by 85%.',
      },
      {
        id: 2,
        description:
          'Designed and launched a ticketing help desk system that reduced average support resolution time from 5 days to 1.5 days (70% improvement).',
      },
      {
        id: 3,
        description:
          'Increased user satisfaction scores by 40% through streamlined support workflows.',
      },
    ],
  },
  {
    id: 5,
    company: 'Tiqpay',
    title: 'Software Engineer',
    date: 'May 2024',
    descriptions: [
      {
        id: 1,
        description:
          'Managed core banking IT operations, reducing system downtime by 30%.',
      },
      {
        id: 2,
        description:
          'Created and assigned staff profiles on internal systems, improving onboarding efficiency by 50%.',
      },
      {
        id: 3,
        description:
          'Developed a secure desktop plugin for transaction validation, increasing fraud detection accuracy by 60%.',
      },
      {
        id: 4,
        description:
          'Coordinated frontend integration with the Tiqpay gateway, ensuring 100% compatibility.',
      },
    ],
  },
];
