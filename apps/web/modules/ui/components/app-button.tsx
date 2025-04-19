import Link from "next/link";
import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

type AppButtonProps = {
  platform: "google" | "apple";
  link: string;
};

const AppButton: React.FC<AppButtonProps> = ({ platform, link }) => {
  const isGoogle = platform === "google";

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md transition"
    >
      {isGoogle ? (
        <>
          <FaGooglePlay size={32} className="text-primary-foreground" />
          <span className="text-sm">
            GET IT ON
            <br />
            <span className="font-bold text-2xl">Google Play</span>
          </span>
        </>
      ) : (
        <>
          <FaApple size={40} className="text-primary-foreground" />
          <span className="text-sm">
            Download on the
            <br />
            <span className="font-bold text-2xl">App Store</span>
          </span>
        </>
      )}
    </Link>
  );
};

export default AppButton;
