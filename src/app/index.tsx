import '../styles/_global.scss';
import {render, h} from 'preact';
import App from './App';

render(<App/>, document.getElementById('app') as HTMLElement);
