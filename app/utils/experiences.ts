import { Experiences } from '@/types';

export const experiences: Experiences[] = [
  {
    id: 1,
    company: 'Booking Corps',
    title: 'Software Engineer',
    date: 'Jun 2024',
    descriptions: [
      {
        id: 1,
        description:
          'Collaborated with the external team and UI/UX designer to develop the hotel and shortlet booking feature, optimizing functionality and user experience.',
      },
      {
        id: 2,
        description:
          'Handled the deployment and integration of Stripe payment, ensuring secure transactions and enhancing platform reliability through thorough testing, compliance, and deployment to our internal server.',
      },
    ],
  },
  {
    id: 2,
    company: 'Tiqpay',
    title: 'Software Engineer',
    date: 'May 2024',
    descriptions: [
      {
        id: 1,
        description:
          'Collaborated with an external team to integrate the Tiqpay payment gateway with the existing frontend, ensuring seamless payment processing.',
      },
      {
        id: 2,
        description:
          "Conducted rigorous testing and troubleshooting to ensure the payment gateway's compatibility and functionality.",
      },
    ],
  },
  {
    id: 3,
    company: 'Gracetech Group',
    title: 'Lead Software Engineer',
    date: 'Jan 2023',
    descriptions: [
      {
        id: 1,
        description:
          'I contributed to the implementation of an in-house ERP platform where users clockin and out using facial biometric devices, ensuring accurate and secure attendance tracking for the organization.',
      },
      {
        id: 2,
        description:
          'Spearheaded the research, development and integration of a ticketing help-desk system, streamlining support operations, improving response times, and enhancing overall user satisfaction by providing efficient and organized assistance',
      },
    ],
  },
  {
    id: 4,
    company: 'Tiqbuy',
    title: 'Software Engineer',
    date: 'Sep 2023',
    descriptions: [
      {
        id: 1,
        description:
          'Participated in establishing website analytics dashboards to track key metrics like traffic sources, user behavior, and product performance, contributing to data-driven decision making for continuous improvement.',
      },
      {
        id: 2,
        description:
          'Collaborated closely with developers, marketers, and sales personnel on the migration of our e-commerce platform from WooCommerce to a modern Next.js application powered by the MedusaJS headless commerce framework.',
      },
    ],
  },
];
