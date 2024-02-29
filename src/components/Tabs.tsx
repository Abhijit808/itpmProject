import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
// type obj = Array<{
//   id: string;
//   name: string;
// }>;

const Tabs = (Path: any) => {
  console.log(Path);
  if (Path.Path === undefined) {
    return <div></div>;
  } else {
    return (
      <div className="flex gap-2 breadcrumbs">
        {Path.Path.map((p: any, i: any) => {
          return (
            <Link
              to={p.id === "Root" ? `/` : `/folders/${p.id}`}
              key={i}
              className="flex gap-1 items-center"
            >
              <p className="name text-2xl">{p.name}</p>
              {Path.Path.length - 1 === i ? (
                <span></span>
              ) : (
                <div>
                  <IoIosArrowForward className="text-2xl" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    );
  }
};

export default Tabs;
