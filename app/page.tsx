"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
   const { push } = useRouter();

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const payload = {
         username: event.currentTarget.username.value,
         password: event.currentTarget.password.value,
      };

      try {
         const { data } = await axios.post("/api/auth/login", payload);

         alert(JSON.stringify(data));

         push("/dashboard");
      } catch (e) {
         const error = e as AxiosError;

         alert(error.message);
      }
   };

   return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
         <div className="w-1/4 bg-gray-100 p-6 rounded-lg">
            <h1 className="mb-3 w-full">
               Autenticación manual mediante cookies con JWT
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/4">
               <div>
                  <label htmlFor="username">Usuario: </label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     required
                     className="border rounded border-black"
                  />
               </div>
               <div>
                  <label htmlFor="password">Contraseña: </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     required
                     className="border rounded border-black"
                  />
               </div>

               <button
                  type="submit"
                  className="p-2 bg-black text-white w-fit rounded"
               >
                  Enviar
               </button>
            </form>
         </div>
      </main>
   );
}
