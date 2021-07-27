// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './scss/styles.scss';
import { App } from './core/App';

const app = new App();
if (localStorage.getItem('category') === null) localStorage.setItem('category', 'Action1');
if (localStorage.getItem('mode') === 'play') document.documentElement.classList.add('play');
app.init();
