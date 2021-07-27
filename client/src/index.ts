// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.scss';
import { App } from './core/App';

export const DEFAULT_CATEGORY = 'Action1';
export const SERVER_ADRESS = 'https://fast-beach-76784.herokuapp.com';

const app = new App();
if (localStorage.getItem('category') === null) localStorage.setItem('category', DEFAULT_CATEGORY);
if (localStorage.getItem('mode') === 'play') document.documentElement.classList.add('play');
app.init();
