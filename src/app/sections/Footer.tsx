import { Link } from '@components/Link';
import { PageSection } from '@components/PageSection';
import { Picture } from '@components/Picture';
import { FunctionalComponent } from 'preact';
import styles from './Footer.module.scss';
import faceJpg from './images/face.jpg';
import faceWebp from './images/face.webp';

export const Footer: FunctionalComponent = () => (
    <PageSection id="links" title="Footer" hideNavigationItem={true} hideTitle={true}>
        <div className={styles.footer}>
            <Picture className={styles.face} images={[faceWebp, faceJpg]} alt="Portray" />

            <article className={styles.text}>
                <h1>Simon Reinisch</h1>
                <p>
                    Frontend Developer <Link href="https://www.weclapp.com/en/">@weclapp </Link>- Building web
                    interfaces for humans.
                </p>
            </article>

            <div className={styles.links}>
                <Link href="https://www.linkedin.com/in/simon-r-897365174/" label="LinkedIn Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
                    </svg>
                </Link>
                <Link href="https://github.com/simonwep" label="GitHub Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                    </svg>
                </Link>
                <Link href="https://stackoverflow.com/users/7664765/simon" label="Stackoverflow Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
                        <path d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z" />
                        <path d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z" />
                    </svg>
                </Link>
                <Link href="https://medium.com/@reinisch" label="Medium Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <path d="M 3 6 L 7 11.091797 L 7 35.285156 L 1 43 L 15 43 L 9 35.285156 L 9 13.75 L 22 43 L 21.998047 43.013672 L 34 13.544922 L 34 39 L 30 43 L 47 43 L 43 39 L 42.972656 10.503906 L 46.863281 6.0136719 L 34.845703 6.0136719 L 25.605469 28.744141 L 15.496094 6 L 3 6 z" />
                    </svg>
                </Link>
                <Link href="https://buymeacoffee.com/aVc3krbXQ" label="BuyMeACoffee Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M15.62,14.02c-0.93,0.4-1.98,0.85-3.34,0.85c-0.57,0-1.14-0.08-1.68-0.23l0.94,9.66c0.03,0.4,0.22,0.78,0.52,1.05c0.3,0.27,0.69,0.43,1.09,0.43c0,0,1.33,0.07,1.78,0.07c0.48,0,1.92-0.07,1.92-0.07c0.41,0,0.8-0.15,1.09-0.43c0.3-0.27,0.48-0.65,0.52-1.05l1.01-10.68c-0.45-0.15-0.91-0.26-1.42-0.26C17.16,13.36,16.45,13.67,15.62,14.02z" />
                        <path d="M23.82,9.01l-0.14-0.71c-0.13-0.64-0.42-1.25-1.07-1.48c-0.21-0.07-0.45-0.11-0.61-0.26c-0.16-0.15-0.21-0.39-0.25-0.61c-0.07-0.41-0.13-0.81-0.21-1.22c-0.06-0.35-0.11-0.74-0.27-1.06c-0.21-0.43-0.64-0.68-1.07-0.85c-0.22-0.08-0.44-0.15-0.67-0.21c-1.07-0.28-2.2-0.39-3.3-0.45c-1.32-0.07-2.65-0.05-3.97,0.07c-0.98,0.09-2.02,0.2-2.95,0.54C8.96,2.89,8.61,3.04,8.35,3.3C8.03,3.63,7.93,4.13,8.16,4.53C8.33,4.82,8.61,5.02,8.9,5.16c0.39,0.17,0.79,0.3,1.21,0.39c1.15,0.26,2.35,0.36,3.53,0.4c1.31,0.05,2.62,0.01,3.92-0.13c0.32-0.04,0.64-0.08,0.96-0.13c0.38-0.06,0.62-0.55,0.51-0.9c-0.13-0.41-0.49-0.57-0.9-0.51c-0.06,0.01-0.12,0.02-0.18,0.03l-0.04,0.01c-0.14,0.02-0.27,0.03-0.41,0.05c-0.28,0.03-0.57,0.06-0.85,0.07c-0.64,0.04-1.28,0.06-1.91,0.07c-0.63,0-1.25-0.02-1.88-0.06C12.56,4.43,12.28,4.41,12,4.38c-0.13-0.01-0.26-0.03-0.39-0.04l-0.12-0.02l-0.03,0L11.33,4.3c-0.26-0.04-0.52-0.08-0.78-0.14c-0.03-0.01-0.05-0.02-0.07-0.04c-0.02-0.02-0.03-0.05-0.03-0.07c0-0.03,0.01-0.05,0.03-0.07c0.02-0.02,0.04-0.04,0.07-0.04h0c0.22-0.05,0.45-0.09,0.67-0.12c0.08-0.01,0.15-0.02,0.23-0.03h0c0.14-0.01,0.28-0.03,0.42-0.05c1.22-0.13,2.45-0.17,3.68-0.13c0.6,0.02,1.19,0.05,1.78,0.11c0.13,0.01,0.25,0.03,0.38,0.04c0.05,0.01,0.1,0.01,0.15,0.02l0.1,0.01c0.29,0.04,0.57,0.09,0.86,0.16c0.42,0.09,0.96,0.12,1.15,0.58c0.06,0.15,0.09,0.31,0.12,0.46l0.04,0.2c0,0,0,0.01,0,0.01c0.1,0.46,0.2,0.92,0.3,1.39c0.01,0.03,0.01,0.07,0,0.1c-0.01,0.03-0.02,0.07-0.04,0.1s-0.05,0.05-0.08,0.07c-0.03,0.02-0.06,0.03-0.1,0.03h0l-0.06,0.01L20.1,6.9c-0.19,0.02-0.38,0.05-0.57,0.07c-0.37,0.04-0.75,0.08-1.13,0.11c-0.75,0.06-1.5,0.1-2.25,0.12c-0.38,0.01-0.76,0.01-1.15,0.01c-1.52,0-3.04-0.09-4.55-0.26c-0.16-0.02-0.33-0.04-0.49-0.06c0.13,0.02-0.09-0.01-0.14-0.02c-0.1-0.01-0.21-0.03-0.31-0.05C9.17,6.77,8.82,6.7,8.47,6.65c-0.42-0.07-0.82-0.03-1.2,0.17C6.96,6.99,6.7,7.25,6.54,7.57C6.38,7.91,6.33,8.28,6.26,8.65C6.18,9.01,6.07,9.41,6.11,9.78c0.09,0.81,0.66,1.47,1.47,1.61c0.76,0.14,1.53,0.25,2.3,0.35c3.03,0.37,6.09,0.42,9.13,0.13c0.25-0.02,0.49-0.05,0.74-0.08c0.08-0.01,0.16,0,0.23,0.03c0.07,0.03,0.14,0.07,0.19,0.12c0.06,0.05,0.1,0.12,0.12,0.19c0.03,0.07,0.04,0.15,0.03,0.23l-0.08,0.75c-0.15,1.51-0.31,3.02-0.47,4.53c-0.16,1.59-0.32,3.17-0.49,4.76c-0.05,0.45-0.09,0.89-0.14,1.34c-0.04,0.44-0.05,0.89-0.13,1.33c-0.13,0.68-0.59,1.1-1.27,1.26c-0.62,0.14-1.25,0.21-1.88,0.22c-0.7,0-1.41-0.03-2.11-0.02c-0.75,0-1.67-0.07-2.25-0.62c-0.51-0.49-0.58-1.26-0.65-1.92c-0.09-0.88-0.18-1.76-0.27-2.64l-0.51-4.89l-0.33-3.16c-0.01-0.05-0.01-0.1-0.02-0.16c-0.04-0.38-0.31-0.75-0.73-0.73c-0.36,0.02-0.77,0.32-0.73,0.73l0.24,2.35l0.51,4.85c0.14,1.38,0.29,2.76,0.43,4.13c0.03,0.26,0.05,0.53,0.08,0.79c0.16,1.44,1.26,2.22,2.62,2.44c0.8,0.13,1.61,0.15,2.42,0.17c1.04,0.02,2.08,0.06,3.1-0.13c1.51-0.28,2.64-1.29,2.81-2.85c0.05-0.45,0.09-0.9,0.14-1.36c0.15-1.5,0.31-2.99,0.46-4.49l0.5-4.89l0.23-2.24c0.01-0.11,0.06-0.22,0.13-0.3c0.08-0.08,0.18-0.14,0.28-0.16c0.43-0.08,0.85-0.23,1.15-0.56C23.89,10.38,23.99,9.69,23.82,9.01z M7.56,9.49c0.01,0-0.01,0.05-0.01,0.08C7.55,9.53,7.55,9.49,7.56,9.49z M7.6,9.81c0,0,0.01,0.01,0.02,0.03C7.61,9.83,7.6,9.81,7.6,9.81L7.6,9.81z M7.65,9.87C7.66,9.89,7.67,9.91,7.65,9.87L7.65,9.87z M7.73,9.93L7.73,9.93C7.73,9.94,7.73,9.94,7.73,9.93C7.73,9.94,7.73,9.94,7.73,9.93L7.73,9.93z M22.23,9.83c-0.16,0.15-0.39,0.22-0.62,0.25c-2.59,0.38-5.22,0.58-7.84,0.49c-1.88-0.06-3.73-0.27-5.59-0.53C8,10.02,7.8,9.98,7.68,9.85C7.44,9.6,7.56,9.09,7.62,8.78c0.06-0.28,0.16-0.65,0.5-0.69c0.52-0.06,1.12,0.16,1.64,0.24c0.62,0.09,1.24,0.17,1.86,0.23c2.66,0.24,5.37,0.2,8.02-0.15c0.48-0.06,0.96-0.14,1.44-0.23c0.43-0.08,0.9-0.22,1.16,0.22c0.18,0.3,0.2,0.7,0.17,1.05C22.4,9.59,22.34,9.73,22.23,9.83L22.23,9.83z" />
                    </svg>
                </Link>
            </div>
        </div>
    </PageSection>
);
