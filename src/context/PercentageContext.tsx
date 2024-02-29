import { Dispatch, SetStateAction, createContext, useState } from "react";
type valProps = {
  percentage: number;
  setPercentage: Dispatch<SetStateAction<number>>;
};
export const percentageProvider = createContext<valProps | null>(null);
const PercentageContext = ({ children }: { children: any }) => {
  const [percentage, setPercentage] = useState<number>(0);
  const value: valProps = {
    percentage,
    setPercentage,
  };
  return (
    <>
      <percentageProvider.Provider value={value}>
        {children}
      </percentageProvider.Provider>
    </>
  );
};

export default PercentageContext;
