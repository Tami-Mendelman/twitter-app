import { createUseStyles } from 'react-jss';

export const useNavbarStyles = createUseStyles({
Navbar: {
display: 'flex',
flexWrap: 'wrap',
gap: '2vw',
alignItems: 'center',
padding: '1.5vw 4%',
backgroundColor: '#17202a',
'& a': {
color: '#fff',
textDecoration: 'none',
padding: '0.75vw 1%',
borderRadius: '6px',
},
'& a.active': {
backgroundColor: '#35434f',
},
'@media (max-width: 600px)': {
gap: '2vw',
padding: '3vw 4%',
'& a': {
padding: '2vw 1%',
},
},
},
Identity: {
color: '#fff',
padding: '0.75vw 1%',
},
Logout: {
padding: '0.75vw 1%',
border: '1px solid #8996a3',
borderRadius: '6px',
backgroundColor: 'transparent',
color: '#fff',
cursor: 'pointer',
font: 'inherit',
},
});
