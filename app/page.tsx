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
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            gestión de <span className="text-primary">inventario</span>
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta, voluptates sapiente officia, corrupti
            quis deserunt ullam fugiat ex, earum dignissimos iusto expedita eaque recusandae doloribus laboriosam dicta.
            At, magni?
          </p>
          <Button asChild className="mt-4">
            <Link href="/nuevo">Comenzar</Link>
          </Button>
        </div>
        <Image src={landingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}
