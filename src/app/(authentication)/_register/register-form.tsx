import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Crie uma conta</CardTitle>
        <CardDescription>
          Informe abaixo suas informações de acesso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nome</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Sobrenome</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Criar conta
          </Button>
          <Button
            variant="outline"
            className="w-full"
          >
            Entrar com o Google
          </Button>
        </div>
        <div className="mt-4 text-center flex items-center justify-center gap-1 text-sm">
          Já possui uma conta?
          <Link
            href="/login"
            className="underline"
          >
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
