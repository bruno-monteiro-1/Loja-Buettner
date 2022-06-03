import { useContext } from 'react';

import SearchIcon from '../../../assets/icons/Search.svg';
import CloseButton from '../../assets/icons/CloseButton.svg';

import styles from './styles.module.css';

import { SearchBarProps } from './searchBar.types';
import OverlayContext from '../../context/OverlayContext';
import SearchBarContext from '../../context/SearchBarContext';

export default function SearchBar({ children }: SearchBarProps) {
  const windowView = window.innerWidth;

  const { handleClickToChangeOverlayState } = useContext(OverlayContext);
  const { searchBarIsVisible, handleClickToChangeSearchBarState } =
    useContext(SearchBarContext);

  return (
    <>
      {windowView < 1025 && children}

      {windowView >= 1025 && (
        <>
          {!searchBarIsVisible && (
            <>
              <button
                type="button"
                onClick={() => {
                  handleClickToChangeSearchBarState(),
                    handleClickToChangeOverlayState();
                }}
                className={styles.searchButton}
              >
                <img src={SearchIcon} alt="Search Bar" title="Search Bar" />
              </button>
            </>
          )}

          {searchBarIsVisible && (
            <>
              <div className={styles.searchBarContainer}>
                {searchBarIsVisible && children}
                <button
                  type="button"
                  onClick={() => {
                    handleClickToChangeSearchBarState(),
                      handleClickToChangeOverlayState();
                  }}
                  className={styles.closeButtonBar}
                >
                  <img
                    src={CloseButton}
                    alt="Close Button Search Bar"
                    title="Close Button Search Bar"
                  />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
