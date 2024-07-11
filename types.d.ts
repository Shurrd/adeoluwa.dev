import { IconType } from 'react-icons';

export interface Menu {
  id: number;
  name: string;
  url: string;
}

export interface Social {
  id: number;
  icon: IconType;
  name: string;
  url: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  skills: Skill[];
  isMaintaining?: boolean;
  urls: Url[];
}

type Skill = {
  id: number;
  label: string;
};

type Url = {
  id: number;
  url: string;
  name: string;
  icon: IconType;
};

export interface Technologies {
  id: number;
  name: string;
}

export interface Experiences {
  id: number;
  title: string;
  date: string;
  descriptions: Descriptions[];
}

type Descriptions = {
  id: number;
  description: string;
};
