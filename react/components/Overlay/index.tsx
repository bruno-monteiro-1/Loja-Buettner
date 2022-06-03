import { useContext } from 'react';
import OverlayContext from '../../context/OverlayContext';
import SearchBarContext from '../../context/SearchBarContext';

import styles from './styles.module.css';

export default function Overlay() {
  const { overlayIsVisible, handleClickToChangeOverlayState } =
    useContext(OverlayContext);

  const { handleClickToChangeSearchBarState } = useContext(SearchBarContext);

  return (
    <>
      {overlayIsVisible && (
        <div
          className={styles.overlayContainer}
          onClick={() => {
            handleClickToChangeSearchBarState(),
              handleClickToChangeOverlayState();
          }}
        />
      )}
    </>
  );
}
