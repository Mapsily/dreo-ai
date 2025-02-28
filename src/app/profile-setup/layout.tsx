import Image from "next/image";

export default function ProfileSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">
      <Image
        src="/images/logo-grayscale.png"
        alt="logo"
        width={150}
        height={150}
      />
      <div className="mt-8 bg-white border rounded-xl py-16 flex justify-center">
        <div className="w-1/3">
          <h1 className="text-center text-2xl font-semibold mb-2">
            You're In! Now let's set up your profile
          </h1>
          <p className="text-center text-sm text-gray-600 mb-14">
            Customize your profile to start connecting, booking, <br /> and
            growing with AI-powered outreach.
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
