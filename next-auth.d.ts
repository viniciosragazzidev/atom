import type { Session } from "next-auth";
declare module "next-auth" {
  interface Session extends Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;

      profileId: string;
    };
  }
}
