import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/images/logo.png" alt="corena-logo" width={40} height={40} />
      <span className="font-semibold text-xl">Corena ai</span>
    </div>
  );
}
