import Image from "next/image";

interface Props {
  imageUrl: string;
  title: string;
  description: string;
  Actions?: React.ReactNode;
}

export default function NoItemsLayout({
  description,
  imageUrl,
  title,
  Actions,
}: Props) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <Image alt="no-conversations" src={imageUrl} width={100} height={100} />
      <h3 className="mt-4 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm max-w-[350px] mb-4">{description}</p>
      {Actions && Actions}
    </div>
  );
}
