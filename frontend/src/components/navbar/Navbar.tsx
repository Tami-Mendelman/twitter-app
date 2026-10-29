import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/theme';
import { useStyles } from './styles';

export const Navbar: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'NAVBAR' });
  const classes = useStyles();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={classes.navbar}>
      <NavLink to="/posts" end>{t('POSTS')}</NavLink>
      <NavLink to="/users" end>{t('USERS')}</NavLink>
      <NavLink to="/users/new">{t('CREATE_USER')}</NavLink>
      <NavLink to="/posts/new">{t('CREATE_POST')}</NavLink>
      <button type="button" className={classes.themeToggle} onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
    </nav>
  );
};
