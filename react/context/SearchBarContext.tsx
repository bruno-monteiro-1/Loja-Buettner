import { createContext, useState, ReactChild, useCallback } from 'react';

interface SearchBarContextProps {
  searchBarIsVisible: boolean;
  handleClickToChangeSearchBarState: () => void;
}

interface SearchBarProps {
  children: ReactChild;
}

const SearchBarContext = createContext<SearchBarContextProps>({
  searchBarIsVisible: false,
  handleClickToChangeSearchBarState: () => {},
});

export function SearchBarProvider({ children }: SearchBarProps) {
  const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

  const handleClickToChangeSearchBarState = useCallback(() => {
    setSearchBarIsVisible(prevState => !prevState);
  }, [setSearchBarIsVisible]);

  return (
    <SearchBarContext.Provider
      value={{
        searchBarIsVisible,
        handleClickToChangeSearchBarState,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}

export default SearchBarContext;
