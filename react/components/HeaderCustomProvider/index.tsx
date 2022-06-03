import { OverlayProvider } from '../../context/OverlayContext';
import { SearchBarProvider } from '../../context/SearchBarContext';

import { HeaderCustomProviderProps } from './headerCustomProvides.types';

export default function HeaderCustomProvider({
  children,
}: HeaderCustomProviderProps) {
  return (
    <>
      <SearchBarProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </SearchBarProvider>
    </>
  );
}
