// lib/auth.ts 또는 lib/auth/index.ts

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [], // 실제 사용 중인 provider 설정 필요
  secret: process.env.NEXTAUTH_SECRET,
};
