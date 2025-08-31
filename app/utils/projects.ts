import { Project } from '@/types';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
export const projects: Project[] = [
  {
    id: 1,
    name: 'EZ Gas',
    description:
      'EZ Gas is a modern platform designed to simplify gas ordering and delivery for households and businesses. The mobile app ensures seamless ordering, real-time tracking, and reliable service powered by a scalable backend infrastructure.',
    urls: [
      {
        id: 1,
        url: 'https://myezgas.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'React Native (Expo)' },
      { id: 2, label: 'NestJS' },
      { id: 3, label: 'NATS' },
      { id: 4, label: 'Sentry' },
      { id: 5, label: 'MongoDB' },
      { id: 6, label: 'Docker' },
    ],
    isMaintaining: true,
  },
  {
    id: 2,
    name: 'Gracetech Properties',
    description:
      'Gracetech Properties is the real estate investment arm of Gracetech Group, offering asset management and property development advisory services with innovative designs and modern living solutions.',
    urls: [
      {
        id: 1,
        url: 'https://gracetechproperties.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'NextJs' },
      { id: 2, label: 'Shadcn UI' },
      { id: 3, label: 'Typescript' },
    ],
  },
  {
    id: 3,
    name: 'Partner Mobile',
    description:
      'Partner Mobile is a tech company that provides high-speed fiber optic internet connectivity and offers a wide range of mobile phones and accessories. The platform ensures seamless user experience and reliable services through a scalable and secure backend system.',
    urls: [
      {
        id: 1,
        url: 'https://www.partnermobile.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'NestJS' },
      { id: 2, label: 'Docker' },
      { id: 3, label: 'Kafka' },
      { id: 4, label: 'Sentry' },
      { id: 5, label: 'Postgresql' },
    ],
    isMaintaining: true,
  },
  {
    id: 4,
    name: 'Booking Corps',
    description:
      'BookingCorps simplifies your travel plans with easy-to-use services for booking hotels, shortlets, and car rentals all in one place.',
    urls: [
      {
        id: 1,
        url: 'https://www.bookingcorps.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'Nginx' },
      { id: 2, label: 'Docker' },
      { id: 3, label: 'Cpanel' },
      { id: 4, label: 'CI/CD' },
      { id: 5, label: 'Stripe' },
    ],
  },
  {
    id: 5,
    name: 'Tiqbuy',
    description:
      'TiqBuy is an innovative eCommerce website that offers a seamless shopping experience with a wide range of products and intuitive features.',
    urls: [
      {
        id: 1,
        url: 'https://www.tiqbuy.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'Wordpress' },
      { id: 2, label: 'Woocommerce' },
      { id: 3, label: 'NextJS' },
      { id: 4, label: 'MedusaJS' },
      { id: 5, label: 'Postgresql' },
      { id: 6, label: 'Redis' },
    ],
  },
  {
    id: 6,
    name: 'Tiqpay',
    description:
      'TiqPay is a cutting-edge fintech application designed to streamline transactions and elevate your financial management experience.',
    urls: [
      {
        id: 1,
        url: 'https://www.tiqpayment.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'Typescript' },
      { id: 2, label: 'NextJS' },
      { id: 3, label: 'Postgresql' },
      { id: 4, label: 'NestJS' },
      { id: 5, label: 'React Native(Expo)' },
    ],
    isMaintaining: true,
  },
];
