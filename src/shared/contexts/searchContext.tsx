import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type SearchContextType = {
  searchValue: string;
  setSearchValue: (search: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "UseSearchContext can`t be use without search context provider"
    );
  }
  return context;
};
