import { Project } from '@/types';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export const projects: Project[] = [
  {
    id: 1,
    name: 'OctoProfile',
    description:
      'View your GitHub profile for visual insights on top languages, starred repositories, and more. Sort repositories by size, forks, and stars',
    urls: [
      {
        id: 1,
        url: 'https://octoclone.vercel.app/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
      {
        id: 2,
        url: 'https://github.com/Shurrd/github-profile',
        name: 'github',
        icon: FaGithub,
      },
    ],
    skills: [
      {
        id: 1,
        label: 'Typescript',
      },
      {
        id: 2,
        label: 'NextJS',
      },
      {
        id: 3,
        label: 'Github Polyglot',
      },
      {
        id: 4,
        label: 'Tailwind css',
      },
    ],
  },
  {
    id: 2,
    name: 'Creative People Republic',
    description:
      'A portfolio for creatives where art meets technology to deliver exceptional services and turn ideas into success.',
    urls: [
      {
        id: 1,
        url: 'https://www.creativepeoplerepublic.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      {
        id: 1,
        label: 'Typescript',
      },
      {
        id: 2,
        label: 'NextJS',
      },
      {
        id: 3,
        label: 'Framer Motion',
      },
      {
        id: 4,
        label: 'Tailwind css',
      },
    ],
  },

  {
    id: 3,
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
      {
        id: 1,
        label: 'Typescript',
      },
      {
        id: 2,
        label: 'NextJS',
      },
      {
        id: 3,
        label: 'Postgresql',
      },
      {
        id: 4,
        label: 'NestJS',
      },
      {
        id: 5,
        label: 'React Native(Expo)',
      },
    ],
    isMaintaining: true,
  },
  {
    id: 4,
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
      {
        id: 1,
        label: 'Wordpress',
      },
      {
        id: 2,
        label: 'Woocommerce',
      },
    ],
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
      {
        id: 2,
        label: 'Nginx',
      },
      {
        id: 2,
        label: 'Docker',
      },
      {
        id: 2,
        label: 'Cpanel',
      },
      {
        id: 2,
        label: 'CI/CD',
      },
    ],
  },
  {
    id: 5,
    name: 'Tiktik',
    description:
      'TikTik is a TikTok clone that brings you the same engaging short-form video experience with a fresh twist',
    urls: [
      {
        id: 1,
        url: 'https://tiktok-clone-sigma-pied.vercel.app/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
      {
        id: 2,
        url: 'https://github.com/Shurrd/Tiktok-clone',
        name: 'github',
        icon: FaGithub,
      },
    ],
    skills: [
      {
        id: 1,
        label: 'Typepscript',
      },
      {
        id: 2,
        label: 'NextJS',
      },
      {
        id: 3,
        label: 'Axios',
      },
      {
        id: 4,
        label: 'Google Oauth',
      },
      {
        id: 5,
        label: 'Zustand',
      },
      {
        id: 6,
        label: 'Sanity',
      },
    ],
  },
];
