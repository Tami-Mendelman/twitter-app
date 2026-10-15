import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './auth-context';
import { useNavbarStyles } from '../styles/navbar.styles';

const Navbar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'NAVBAR' });
  const { user, signOut } = useAuth();
  const classes = useNavbarStyles();

  return (
    <nav className={classes.Navbar}>
      <NavLink to="/posts" end>{t('POSTS')}</NavLink>
      <NavLink to="/users" end>{t('USERS')}</NavLink>
      <NavLink to="/users/new">{t('CREATE_USER')}</NavLink>
      <NavLink to="/posts/new">{t('CREATE_POST')}</NavLink>
      {user ? (
        <span className={classes.Identity}>
          {t('SIGNED_IN_AS', { displayName: user.displayName })}
        </span>
      ) : null}
      <button className={classes.Logout} type="button" onClick={signOut}>
        {t('LOGOUT')}
      </button>
    </nav>
  );
};

export default Navbar;
