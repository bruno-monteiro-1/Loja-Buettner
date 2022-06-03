import { createContext, useState, ReactChild, useCallback } from 'react';

interface OverlayContextProps {
  overlayIsVisible: boolean;
  handleClickToChangeOverlayState: () => void;
}

interface OverlayProviderProps {
  children: Array<ReactChild>;
}

const OverlayContext = createContext<OverlayContextProps>({
  overlayIsVisible: false,
  handleClickToChangeOverlayState: () => {},
});

export function OverlayProvider({ children }: OverlayProviderProps) {
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const handleClickToChangeOverlayState = useCallback(() => {
    setOverlayIsVisible(prevState => !prevState);
  }, [setOverlayIsVisible]);

  return (
    <OverlayContext.Provider
      value={{
        overlayIsVisible,
        handleClickToChangeOverlayState,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export default OverlayContext;
