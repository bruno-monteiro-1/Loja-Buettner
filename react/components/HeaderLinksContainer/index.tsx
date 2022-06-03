import React, { useContext } from 'react';
import SearchBarContext from '../../context/SearchBarContext';
import { HeaderLinksProps } from './headerLinksContainer.types';

export default function HeaderLinksContainer({ children }: HeaderLinksProps) {
  const { searchBarIsVisible } = useContext(SearchBarContext);

  return <>{!searchBarIsVisible && children}</>;
}
