import React, { useState } from "react";

export default function Loader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex gap-2">
            <span className="loader-dot" />
            <span className="loader-dot animation-delay-200" />
            <span className="loader-dot animation-delay-400" />
          </div>
        </div>
      )}
    </>
  );
}
