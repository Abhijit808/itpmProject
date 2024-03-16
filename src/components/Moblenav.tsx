import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowBack } from "react-icons/io";
import { MdGridView } from "react-icons/md";

const Moblenav = (props: any) => {
  const handleSearchClick = () => {
    props.setmobsearch(!props.mobsearch);
  };
  const handlehamburgerClick = () => {
    props.setmobile(!props.mobile);
  };
  return (
    <header className="md:hidden flex items-center justify-between p-5 w-full">
      <div
        className={`burger md:hidden block pl-5 ${
          props.mobsearch ? "hidden" : "block"
        }`}
        onClick={handlehamburgerClick}
      >
        <GiHamburgerMenu className="text-xl" />
      </div>
      <div
        className={`wrapper relative flex items-center ${
          props.mobsearch && "w-full"
        }`}
      >
        <div className="search relative" onClick={handleSearchClick}>
          {!props.mobsearch ? (
            <BiSearch className="h-9 hover:bg-secondary w-9 p-2 rounded-full bg-transparent " />
          ) : (
            <IoMdArrowBack className="absolute z-10 -top-3 Bo left-3 text-2xl font-bold" />
          )}
        </div>
        <div className={`${props.mobsearch ? "block" : "hidden"} w-full`}>
          <input
            type="text"
            placeholder="Search in Drive"
            ref={props.inputref}
            onFocus={(e) => props.handleAppInput(e)}
            onKeyDown={(e) => props.handlesearchkeyup(e)}
            className={`input  md:block w-full absolute left-0 right-0 pl-12 bg-primary placeholder:text-slate-600 ${
              props.appInput && "shadow-3xl "
            } relative bg-`}
          />
        </div>
        <div
          className={`tables_cards_toggel_btn_wrapper relative 
         px-2 py-1 flex  rounded-full ${props.mobsearch ? "hidden" : "block"}`}
        >
          {props.list ? (
            <button
              onClick={(e) => props.handleSelected(e)}
              className={`flex gap-1 items center  `}
            >
              {<MdGridView />}
            </button>
          ) : (
            <button
              onClick={(e) => props.handleSelected(e)}
              data-listview="list"
              className={`flex gap-1 items center    `}
            >
              {<GiHamburgerMenu />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Moblenav;
