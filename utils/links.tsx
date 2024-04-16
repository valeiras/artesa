import { AreaChart, Apple, Milk, BadgePlus, Tractor } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/proveedores",
    label: "Proveedores",
    icon: <Tractor />,
  },
  {
    href: "/articulos",
    label: "Artículos",
    icon: <Apple />,
  },
  {
    href: "/estadisticas",
    label: "Estadísticas",
    icon: <AreaChart />,
  },
];

export default links;
