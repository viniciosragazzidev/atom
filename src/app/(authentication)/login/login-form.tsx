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

export default function LoginForm() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar na conta</CardTitle>
        <CardDescription>
          Informe abaixo suas informações de acesso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full "
          >
            Entrar
          </Button>
          <Button
            variant="outline"
            className="w-full"
          >
            Entrar com o Google
          </Button>
        </div>
        <div className="mt-4 text-center flex items-center gap-1 justify-center text-sm">
          Não tem uma conta?
          <Link
            href="/register"
            className="underline"
          >
            Registre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
