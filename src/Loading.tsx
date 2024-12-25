'use client';

import spline from './assets/spline.gif';

export default function Loading() {

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center font-caveat">
      <div className="flex flex-col items-center justify-center ">
        <img 
          src={spline}
          alt="Loading Animation"
          className="w-96 h-96 object-contain -mb-10"
        />
        <div className="text-center ">
          <h2 className="text-4xl font-bold text-pink-800">
            Thand paaaaa
          </h2>
        </div>
      </div>
    </div>
  );
}
