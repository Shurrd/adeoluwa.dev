import { Experiences } from '@/types';

export const experiences: Experiences[] = [
  {
    id: 1,
    company: 'Etranzact',
    title: 'Software Engineer',
    date: 'Nov 2025 - Present',
    descriptions: [
      {
        id: 1,
        description:
          'Built and optimized backend services for the Osun, Jigawa, and Ojodu State OneMoni revenue platforms using NestJS, Sequelize, and MySQL, powering four core modules: Consultant (agent management), Agent (payment collection), IRS Admin Portal, and Taxpayer, improving API performance and data consistency by 40%.',
      },
      {
        id: 2,
        description:
          'Designed and implemented a wallet system for Jigawa State enabling seamless payment processing for taxpayers and agents.',
      },
      {
        id: 3,
        description:
          'Integrated KYC verification (NIN, BVN, and facial verification) using MetaMap to strengthen identity validation and compliance across the platform.',
      },
      {
        id: 4,
        description:
          'Integrated Credo and additional payment channels, increasing successful revenue collections by 35% across taxpayer and agent transactions.',
      },
      {
        id: 5,
        description:
          'Developed an internal OneMoni demo system for the business team, boosting client engagement and product demonstrations by 50%.',
      },
      {
        id: 6,
        description:
          'Built the frontend for the NRS (Nigeria Revenue Service) internal management portal using Next.js and React, equipping tech support, DevOps, and operational teams with VAT automation verification, e-invoicing, and revenue collection tools (manual payments, unpaid PRN tracking, payment reporting) that streamlined processing for millions of monthly transactions and cut manual reconciliation time by 30%.',
      },
    ],
  },
  {
    id: 2,
    company: 'Synctech Innovations',
    title: 'Lead Software Engineer',
    date: 'Jun 2025 - Present',
    descriptions: [
      {
        id: 1,
        description:
          'Served as Lead Software Engineer on the EZGas mobile platform, building the application end-to-end using React Native (Expo) for mobile and Node.js (Express) with MongoDB for backend services.',
      },
      {
        id: 2,
        description:
          'Led system architecture and core feature development, including Paystack payment integration for secure and reliable in-app transactions.',
      },
      {
        id: 3,
        description:
          'Designed, deployed, and maintained production infrastructure on AWS EC2, managing server setup, environments, and scalability for a startup-grade product.',
      },
      {
        id: 4,
        description:
          'Managed mobile app builds, releases, and updates to the Apple App Store and Google Play Store using Expo Application Services (EAS) to streamline deployment and versioning.',
      },
      {
        id: 5,
        description:
          'Owned technical direction and the full product lifecycle, from initial build to production rollout, ensuring performance, stability, and long-term maintainability.',
      },
    ],
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    company: 'Gracetech Group',
    title: 'Software Engineer - Team Lead',
    date: 'Jun 2023 - Nov 2025',
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
    id: 7,
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
