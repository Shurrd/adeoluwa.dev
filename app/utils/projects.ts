import { Project } from '@/types';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';

export const projects: Project[] = [
  {
    id: 1,
    name: 'Syntherium',
    description:
      'Syntherium is an integrity protocol engine built by Synctech Innovations: one protocol serving multiple regulated industries with immutable, append-only records, atomic transactions and a single source of truth. It underpins EZGas, ZynGas and GPAS.',
    urls: [
      {
        id: 1,
        url: 'https://syntheriumengine.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'Typescript' },
      { id: 2, label: 'NestJS' },
      { id: 3, label: 'Docker' },
      { id: 4, label: 'AWS' },
    ],
  },
  {
    id: 2,
    name: 'Synctech Innovations',
    description:
      'Synctech Innovations is a software company based in Lagos, Nigeria, building web, mobile and infrastructure products including EZGas and Syntherium.',
    urls: [
      {
        id: 1,
        url: 'https://synctechinnovations.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'NextJS' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'React Native (Expo)' },
      { id: 4, label: 'AWS' },
    ],
  },
  {
    id: 3,
    name: 'WebRise Nigeria',
    description:
      'WebRise is a Nigerian digital agency that designs and builds websites, business systems and mobile apps for local businesses, with fixed naira pricing, monthly Paystack payments and full ownership after the final payment.',
    urls: [
      {
        id: 1,
        url: 'https://webrisenigeria.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'NextJS' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'Tailwind' },
      { id: 4, label: 'Paystack' },
    ],
  },
  {
    id: 4,
    name: 'Speeddi Foods',
    description:
      'Speeddi Foods lets customers order staple foods for themselves or family, paying immediately or later once their credit is approved.',
    urls: [
      {
        id: 1,
        url: 'https://speeddifoods.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
    ],
    skills: [
      { id: 1, label: 'NextJS' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'Tailwind' },
      { id: 4, label: 'Paystack' },
    ],
  },
  {
    id: 5,
    name: 'Depot Price Today',
    description:
      'Depot Price Today is a platform for keeping up with daily depot prices, available on the web and as a mobile app.',
    urls: [
      {
        id: 1,
        url: 'https://depotpricetoday.com/',
        name: 'live',
        icon: FaExternalLinkAlt,
      },
      {
        id: 2,
        url: 'https://play.google.com/store/apps/details?id=com.synctech.depotpricetoday&hl=en',
        name: 'Google Play',
        icon: FaGooglePlay,
      },
      {
        id: 3,
        url: '',
        name: 'App Store',
        icon: FaApple,
        comingSoon: true,
      },
    ],
    skills: [
      { id: 1, label: 'NextJS' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'Tailwind' },
      { id: 4, label: 'Paystack' },
    ],
  },
  {
    id: 6,
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
      {
        id: 2,
        url: 'https://apps.apple.com/us/app/ez-gas/id6751143373',
        name: 'App Store',
        icon: FaApple,
      },
      {
        id: 3,
        url: 'https://play.google.com/store/apps/details?id=com.devsynctech.ezgasmobilefrontend',
        name: 'Google Play',
        icon: FaGooglePlay,
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
    id: 7,
    name: 'ZynGas Enterprise',
    description:
      'ZynGas Enterprise is the customer-facing mobile app for ordering gas and tracking deliveries, powered by the Syntherium engine.',
    urls: [
      {
        id: 1,
        url: 'https://apps.apple.com/ng/app/zyngas-enterprise/id6762097803',
        name: 'App Store',
        icon: FaApple,
      },
      {
        id: 2,
        url: 'https://play.google.com/store/apps/details?id=com.devsynctech.zyngasenterprise&hl=en',
        name: 'Google Play',
        icon: FaGooglePlay,
      },
    ],
    skills: [
      { id: 1, label: 'React Native (Expo)' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'Zustand' },
    ],
  },
  {
    id: 8,
    name: 'Energo Logistics',
    description:
      'Energo Logistics is the driver app that supports EZ Gas and ZynGas deliveries, helping drivers accept, manage and complete orders.',
    urls: [
      {
        id: 1,
        url: 'https://apps.apple.com/ng/app/energo-logistics/id6762177167',
        name: 'App Store',
        icon: FaApple,
      },
      {
        id: 2,
        url: 'https://play.google.com/store/apps/details?id=com.devsynctech.paccelogistics&hl=en',
        name: 'Google Play',
        icon: FaGooglePlay,
      },
    ],
    skills: [
      { id: 1, label: 'React Native (Expo)' },
      { id: 2, label: 'Typescript' },
      { id: 3, label: 'Zustand' },
    ],
  },
  {
    id: 9,
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
    id: 10,
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
