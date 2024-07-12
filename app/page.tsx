import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/logo.svg";
import landingImg from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <header className="lg:max-w-6xl w-full px-4 sm:px-8 py-6">
        <Image src={logo} alt="logo" width={300} className="w-[200px] sm:w-[300px]" />
      </header>
      <section className="pt-8 lg:max-w-6xl w-full flex flex-col items-start px-4 sm:px-8 gap-16 sm:gap-4 flex-1 justify-center lg:grid lg:grid-cols-[1fr,400px] lg:justify-start lg:items-center">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-5xl sm:text-7xl font-bold">
            Gestión de <span className="text-primary">trazabilidad</span>
          </h1>
          <p className="leading-loose max-w-md text-lg">
            Gestión simplificada de trazabilidad para pequeños y medianos productores.
          </p>
          <Button asChild className="text-lg">
            <Link href="/materias-primas">Comenzar</Link>
          </Button>
        </div>
        <Image
          src={landingImg}
          alt="landing"
          className="w-full max-w-[300px] sm:max-w-[400px] lg:w-auto mx-auto sm:mx-0 sm:ml-auto"
        />
      </section>
    </main>
  );
}
