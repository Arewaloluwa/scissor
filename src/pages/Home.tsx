import { UserButton } from "@clerk/clerk-react";
import ShortenForm from "../components/ShortenForm";
import QRCodeDisplay from "../components/QRCodeDisplay";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between mb-8">
       <div>
      <QRCodeDisplay value="" />
    </div>
        <h1 className="text-4xl font-bold">
          Scissor
        </h1>

        <UserButton />
      </div>

      <ShortenForm />
    </div>
  );
}
