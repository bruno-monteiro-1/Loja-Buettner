import { useProduct } from 'vtex.product-context';
import React from 'react';

import styles from './styles.module.css';

export default function ProductFlags() {
  const productContextValue = useProduct();

  return (
    <div className={styles.containerFlags} data-testid="product-flags">
      {productContextValue.selectedItem.complementName && (
        <span
          className={styles.productSpecifications}
          data-testid="product-specifications"
        >
          {productContextValue.selectedItem.complementName}
        </span>
      )}
    </div>
  );
}
