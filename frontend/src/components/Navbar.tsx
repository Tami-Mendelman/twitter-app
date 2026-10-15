import { NavLink } from 'react-router-dom';
import { useNavbarStyles } from '../styles/navbar.styles';

const Navbar = () => {
const classes = useNavbarStyles();

return ( <nav className={classes.Navbar}> <NavLink to="/posts" end>
Posts </NavLink> <NavLink to="/users" end>
Users </NavLink> <NavLink to="/users/new">
Create User </NavLink> <NavLink to="/posts/new">
Create Post </NavLink> </nav>
);
};

export default Navbar;
