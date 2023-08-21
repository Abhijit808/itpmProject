import { ReactNode, useRef, useState } from "react";
// import { Modelcontext } from '../context/ModelProvider';
interface Modalprops {
  btnText: string | ReactNode;
  modelText: string;
  closeBtn: string | ReactNode;
  okBtn: string | ReactNode;
  value?: ReactNode;
  onsave?: (value: any, folder?: any) => void | any | undefined;
  folder: any;
}
const Model = ({
  btnText,
  modelText,
  closeBtn,
  okBtn,
  onsave,
  folder,
}: Modalprops) => {
  const [showModel, setshowmodel] = useState<boolean>(false);
  const inputref = useRef<HTMLInputElement>(null);
  // const val = useContext(Modelcontext)
  const handleok = () => {
    setshowmodel(false);
    onsave === undefined ? null : onsave(inputref.current!.value, folder);
  };
  return (
    <>
      <button
        className=" bg-white  text-black  border-none  w-full"
        onClick={() => setshowmodel((prev) => !prev)}
      >
        {btnText}
      </button>
      {showModel && (
        <aside
          className={`fixed  opacity-1  bg-opacity-80 bg-black top-0 left-0  h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center transition-all  z-[9999]`}
          onClick={() => setshowmodel(false)}
        >
          <div
            className="text flex flex-col rounded-xl gap-6 relative bg-white p-6 justify-center mx-10  w-[80%] sm:w-[60%] sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center">{modelText}</p>
            <label>
              <input
                type="text"
                className="border-blue-700 border-2 p-2 font-Abel w-full"
                placeholder="Foldername"
                ref={inputref}
              />
            </label>
            <div className="flex sm:flex-row flex-col justify-center  items-center gap-3 sm:justify-between m-auto">
              <button
                className="text-lg border-2 border-blue-600 rounded-lg px-5 py-2 sm:w-full w-50% text-center flex justify-center items-center z-10"
                onClick={() => setshowmodel(false)}
              >
                {closeBtn}
              </button>
              <button
                className="text-lg border-2 border-blue-600 rounded-lg px-5 py-2 sm:w-full w-50% text-center flex justify-center items-center z-10"
                onClick={handleok}
              >
                {okBtn}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Model;
