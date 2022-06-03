export default function logoutClient() {
  fetch('/no-cache/user/logout')
    .then(() => (window.location.href = '/'))
    .catch(() => alert('Não foi possível deslogar'));
}
