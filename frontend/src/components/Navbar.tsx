import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './auth-context';
import ThemeToggleButton from './ThemeToggleButton';
import { useNavbarStyles } from '../styles/navbar.styles';

const Navbar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'NAVBAR' });
  const { user, signOut } = useAuth();
  const classes = useNavbarStyles();

  return (
    <nav className={classes.Navbar}>
      <NavLink to="/posts" end>{t('FEED')}</NavLink>
      <NavLink to="/posts/new">{t('CREATE_POST')}</NavLink>
      <NavLink to="/profile">{t('MY_PROFILE')}</NavLink>
      {user ? (
        <span className={classes.Identity}>
          {t('SIGNED_IN_AS', { displayName: user.displayName })}
        </span>
      ) : null}
      <ThemeToggleButton />
      <button className={classes.Logout} type="button" onClick={signOut}>
        {t('LOGOUT')}
      </button>
    </nav>
  );
};

export default Navbar;
