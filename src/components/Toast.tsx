// import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaRegWindowMinimize } from "react-icons/fa";
import { FiMaximize2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
const Toast = ({
  upload,
  success,
}: {
  upload: number | undefined;
  success: boolean;
}) => {
  upload = 0;
  const [showModel, setshowmodel] = useState<boolean>(false);
  const [close, setclose] = useState<boolean>(false);
  console.log(success);

  console.log(upload);

  return (
    <div>
      {upload >= 0 &&
        !close &&
        createPortal(
          <aside
            className={`  bg-red-600 absolute right-0 w-72  ${
              showModel ? "top-10" : "bottom-2"
            } `}
          >
            <header className="flex flex-row-reverse items-center  ">
              <div
                className="flex items-center justify-center cursor-pointer p-2 bg-slate-500"
                onClick={() => setclose(true)}
              >
                <IoMdClose />
              </div>
              <div
                className="flex items-center justify-center cursor-pointer p-2 bg-slate-500"
                onClick={() => setshowmodel(true)}
              >
                <FiMaximize2 className="bg-blue-900" />
              </div>
              <div
                className="flex flex-col items-center justify-center cursor-pointer p-2 bg-slate-500"
                onClick={() => setshowmodel(false)}
              >
                <FaRegWindowMinimize className=" w-10  h-10 flex items-center justify-center text-white p-2" />
              </div>
            </header>
            <main className={`flex items-center `}>
              <div
                className="radial-progress"
                style={
                  {
                    "--value": `${Math.floor(upload)}`,
                    "--size": "2.5rem",
                    "--thickness": "4px",
                  } as React.CSSProperties
                }
                role="progressbar"
              ></div>
              <div className="name bg-black">hello</div>
            </main>
          </aside>,
          document.getElementById("model")!
        )}
    </div>
  );
};

export default Toast;
