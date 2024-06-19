import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BiLogIn, BiUser } from "react-icons/bi";
import { BsLightning } from "react-icons/bs";
import ImageTop from "@/images/image.svg";
export default function Home() {
  return (
    <main className="w-full   ">
      <div className="w-full flex justify-center  fixed container">
        <header className="w-full flex justify-between  py-6">
          <Logo />

          <ul className=" gap-4 items-center hidden sm:flex">
            <li className="text-blue-400 font-semibold">
              <a href="#">Início</a>
            </li>
            <li>
              <a href="#">Sobre</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
          <div className=" items-center gap-3 text-sm hidden sm:flex">
            <Link
              href="/login"
              className="flex items-center gap-1"
            >
              <BiUser /> Acessar Plataforma
            </Link>

            <Button
              size={"sm"}
              variant={"default"}
              className="bg-blue-500  flex items-center gap-1  h-min px-2 py-1"
            >
              <BiLogIn /> Registre-se
            </Button>
          </div>
        </header>
      </div>

      <div className="w-full flex justify-center max-sm:px-2 max-sm:pt-10 sm:container">
        <section className="w-full flex  flex-col sm:flex-row items-center  justify-between p-6 pt-10 md:pt-24">
          <div className="flex flex-col max-w-xl gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {" "}
              Facilite a foma que você gerencia sua assistência com a Atom
            </h1>
            <p className="text-sm text-secondary-foreground/50">
              Mude para melhor a forma que você organiza e gerencia seu
              estabelecimento de assistência técnica com nosso sistam 100%
              pensado e desenvolvido para seu negocio.
            </p>

            <Button
              variant={"default"}
              className="px-8 my-3 self-start space-x-2"
            >
              <BsLightning className="text-lg" /> Comece agora
            </Button>
          </div>
          <div className="flex w-full justify-end select-none">
            <Image
              src={ImageTop}
              alt="hero image"
              width={460}
              height={460}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
