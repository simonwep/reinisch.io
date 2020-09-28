import {VirtualCard} from '@components/VirtualCard';
import {FunctionalComponent, h} from 'preact';
import styles from './Presentation.module.scss';

type Props = {
    link: string;
    title: string;
    date: string;
    description: string;
    images: string[];
};

export const Presentation: FunctionalComponent<Props> = props => (
    <VirtualCard intensity={0.25}
                 link={props.link}
                 className={styles.presentation}>
        <img srcSet={props.images.map(src => `${src} 1x`).join(',')} alt=""/>

        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={styles.play}>
            <path d="M0,0 L0,30" pathLength="100"/>
            <path d="M0,0 L30,15" pathLength="100"/>
            <path d="M0,30 L30,15" pathLength="100"/>
        </svg>

        <div className={styles.content}>
            <header>
                <h1>{props.title}</h1>
                <p>{props.date}</p>
            </header>

            <article>{props.description}</article>
        </div>
    </VirtualCard>
);
