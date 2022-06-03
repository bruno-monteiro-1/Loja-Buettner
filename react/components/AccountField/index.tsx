import { ReactChild } from 'react';

import styles from './styles.module.css';

interface AccountFieldProps {
  children: ReactChild[];
}

export default function AccountField({ children }: AccountFieldProps) {
  return <div className={styles.accountFieldContainer}>{children}</div>;
}
