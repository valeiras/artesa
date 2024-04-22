"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-y-4 h-full justify-center items-center">
      <h2 className="text-2xl font-bold">Algo ha salido mal:</h2>
      <p className="text-lg">{error.message}</p>
    </div>
  );
}
