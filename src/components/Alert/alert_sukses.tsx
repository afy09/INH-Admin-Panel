import React from "react";
import AnimationSukses from "./animation/Animation_sukses.json";
import Lottie from "lottie-react";

export default function AlertSuccses() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999999">
      <div className="bg-white p-8 rounded-2xl text-center flex flex-col justify-center xl:ms-60">
        <div className=" flex justify-center -mt-14">
          <Lottie className="w-60 h-60" animationData={AnimationSukses} loop={false} />
        </div>
        <p className="text-black-2 font-semibold text-lg -mt-12">Berhasil Menambahkan</p>
        <div className="w-full">
          <button className="mt-4 px-4 py-2 border border-primary2 text-primary2 w-full rounded-xl " onClick={() => window.location.reload()}>
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
