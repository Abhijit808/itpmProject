import { useEffect } from "react";
import { addSearch } from "../queries/addsearchvalues";

const useFetchdetails = (searchval: any, name: string, uid: string) => {
  useEffect(() => {
    async function searchSearchDetails() {
      const searchdata = await addSearch(uid, name, searchval);
      return searchdata;
    }
    searchSearchDetails();
  }, [searchval]);
};
export default useFetchdetails;
