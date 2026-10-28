import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';

export const Navbar: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'NAVBAR' });
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <NavLink to="/posts" end>{t('POSTS')}</NavLink>
      <NavLink to="/users" end>{t('USERS')}</NavLink>
      <NavLink to="/users/new">{t('CREATE_USER')}</NavLink>
      <NavLink to="/posts/new">{t('CREATE_POST')}</NavLink>
    </nav>
  );
};
