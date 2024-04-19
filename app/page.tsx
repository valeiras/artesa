import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import landingImg from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold">
            Gestión de <span className="text-primary">trazabilidad</span>
          </h1>
          <p className="leading-loose max-w-md mt-4 text-lg">
            Gestión simplificada de trazabilidad para pequeños y medianos productores.
          </p>
          <Button asChild className="mt-4 text-lg">
            <Link href="/materias-primas">Comenzar</Link>
          </Button>
        </div>
        <Image src={landingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}
