import { AreaChart, Apple, Milk, User, Tractor, Handshake, Settings } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const strokeWidth = 1.25;

const links: NavLink[] = [
  {
    href: "/materias-primas",
    label: "Materias primas",
    icon: <Apple strokeWidth={strokeWidth} />,
  },
  {
    href: "/productos-finales",
    label: "Productos finales",
    icon: <Milk strokeWidth={strokeWidth} />,
  },
  {
    href: "/proveedores",
    label: "Proveedores",
    icon: <Tractor strokeWidth={strokeWidth} />,
  },
  {
    href: "/clientes",
    label: "Clientes",
    icon: <User strokeWidth={strokeWidth} />,
  },
  {
    href: "/ventas",
    label: "Ventas",
    icon: <Handshake strokeWidth={strokeWidth} />,
  },
  // {
  //   href: "/inventario",
  //   label: "Inventario",
  //   icon: <AreaChart strokeWidth={strokeWidth} />,
  // },
  {
    href: "/ajustes",
    label: "Ajustes",
    icon: <Settings strokeWidth={strokeWidth} />,
  },
];

export default links;
