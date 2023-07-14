"use client";

import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserResponse {
   user: string | null;
   error: AxiosError | null;
}

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [isSuccess, setIsSuccess] = useState<boolean>(false);
   const { push } = useRouter();

   useEffect(() => {
      (async () => {
         const { user, error } = await getUser();

         if (error) {
            push("/");
            return;
         }
         setIsSuccess(true);
      })();
   }, [push]);

   if (!isSuccess) {
      return <p>Loading...</p>;
   }

   return (
      <main>
         <header className="flex justify-center items-center gap-5 p-2 bg-gray-100 h-[7vh]">
            <Link
               href="/dashboard"
               className="hover:bg-black hover:text-white transition duration-300 px-5 py-2 rounded-full"
            >
               Dashboard
            </Link>
            <Link
               href="/dashboard/settings"
               className="hover:bg-black hover:text-white transition duration-300 px-5 py-2 rounded-full"
            >
               Configuración
            </Link>
         </header>
         {children}
      </main>
   );
}

async function getUser(): Promise<UserResponse> {
   try {
      const { data } = await axios.get("/api/auth/me");

      return {
         user: data,
         error: null,
      };
   } catch (e) {
      const error = e as AxiosError;

      return {
         user: null,
         error,
      };
   }
}
