import React from "react";

export default function Errors({ errors }) {
  return (
    <>
      {errors && (
        <div className=" border-2  bg-red-100 text-red-900  p-3 rounded-md mb-4">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
