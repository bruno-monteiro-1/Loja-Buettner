import logoutClient from '../../utils/logoutClient';

import styles from './styles.module.css';

import LogoutIcon from '../../assets/icons/Logout.svg';

export default function LogoutButton() {
  return (
    <button onClick={() => logoutClient()} className={styles.logoutButton}>
      <img src={LogoutIcon} alt="Logout Button" title="Logout" />

      <span> Sair </span>
    </button>
  );
}
