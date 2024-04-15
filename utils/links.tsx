import { AreaChart, Apple, Milk, BadgePlus } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/nuevo",
    label: "Añadir elemento",
    icon: <BadgePlus />,
  },
  {
    href: "/materias-primas",
    label: "materias-primas",
    icon: <Apple />,
  },
  {
    href: "/productos-finales",
    label: "productos finales",
    icon: <Milk />,
  },
  {
    href: "/estadisticas",
    label: "estadísticas",
    icon: <AreaChart />,
  },
];

export default links;
