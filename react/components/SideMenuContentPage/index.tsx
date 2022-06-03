import React, { useState } from 'react';
import { Link } from 'vtex.render-runtime';
import { CustomPageLink } from './sideMenuContentPage.types';

import CustomPages from './mocks/customPages';

import styles from './styles.module.css';

export default function SideMenuContentPage(
  this: any,
  { pageContext, active }: any,
) {
  const [customPage] = useState<CustomPageLink[]>(CustomPages);

  function createLink({ title, href }: any) {
    return (
      <Link to={href} className={title === active ? 'active' : 'disable'}>
        {title}
      </Link>
    );
  }
  return (
    <>
      <div className={styles.sideMenuContainer}>
        {customPage.map(({ title, href, context }) => {
          return pageContext === context ? createLink({ title, href }) : '';
        })}
      </div>
    </>
  );
}

SideMenuContentPage.schema = {
  title: 'Menu Lateral',
  description: 'Menu Lateral da Página de Conteúdo',
};
