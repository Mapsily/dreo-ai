import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-1/2 flex flex-col items-start p-6">
        <Image
          src="/images/logo.png"
          alt="corena-logo"
          sizes="100vw"
          style={{
            width: "25%",
            height: "auto",
          }}
          width={100}
          height={100}
        />
        {children}
      </div>
      <div className="w-1/2 relative overflow-hidden flex flex-col gap-2 mt-6">
        <h2 className="md:text-4xl font-bold">
          Hi, I'm your AI powered sales assistant, Corena!
        </h2>
        <p className="text-gray-400 md:text-sm">
          Corena is capable of prospecting lead information without a form.
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app-ui"
          loading="lazy"
          sizes="30"
          className="absolute -bottom-8 left-0 border-4 border-r-0 border-gray-800 rounded-2xl rounded-r-none p-2 h-auto w-[1080px]"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;
