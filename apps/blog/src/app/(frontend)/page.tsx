import { HomeView } from './HomeView'

export const revalidate = 3600

export default function HomePage() {
  return <HomeView page={1} />
}
