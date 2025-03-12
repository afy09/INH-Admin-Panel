import React from "react";
import AnimationDelete from "./animation/AnimationDelete.json";
import Lottie from "lottie-react";

export default function AlertDelete() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-999999">
      <div className="bg-white p-8 rounded-2xl text-center flex flex-col justify-center xl:ms-60">
        <div className=" flex justify-center ">
          <Lottie className="w-40 h-40" animationData={AnimationDelete} loop={false} />
        </div>
        <p className="text-black-2 font-semibold text-lg mt-4">Berhasil Menghapus Data</p>
        <div className="w-full">
          <button className="mt-4 px-4 py-2 border border-red-700 text-red-700 w-full rounded-xl " onClick={() => window.location.reload()}>
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
