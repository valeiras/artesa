import { AreaChart, Apple, Milk, User, Tractor, Handshake } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/materias-primas",
    label: "Materias primas",
    icon: <Apple />,
  },
  {
    href: "/productos-finales",
    label: "Productos finales",
    icon: <Milk />,
  },
  {
    href: "/proveedores",
    label: "Proveedores",
    icon: <Tractor />,
  },
  {
    href: "/clientes",
    label: "Clientes",
    icon: <User />,
  },
  {
    href: "/ventas",
    label: "Ventas",
    icon: <Handshake />,
  },
  {
    href: "/estadisticas",
    label: "Estadísticas",
    icon: <AreaChart />,
  },
];

export default links;
