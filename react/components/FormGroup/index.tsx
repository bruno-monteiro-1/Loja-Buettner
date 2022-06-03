import styles from './styles.module.css';

import { FormGroupProps } from './FormGroup.types';

export default function FormGroup({ children, error }: FormGroupProps) {
  return (
    <div className={styles.formGroup}>
      {children}

      {error && <small className={styles.messageError}> *{error}* </small>}
    </div>
  );
}
