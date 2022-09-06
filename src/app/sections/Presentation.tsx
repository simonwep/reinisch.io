import { Picture } from '@components/Picture';
import { VirtualCard } from '@components/VirtualCard';
import { FunctionalComponent } from 'preact';
import styles from './Presentation.module.scss';

interface Props {
    link: string;
    title: string;
    date: string;
    description: string;
    images: string[];
}

export const Presentation: FunctionalComponent<Props> = (props) => (
    <VirtualCard intensity={0.25} link={props.link} className={styles.presentation}>
        <Picture images={props.images} alt={`Representive image for the ${props.title} presentation`} />

        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={styles.play}>
            <path d="M0,0 L0,30" pathLength="100" />
            <path d="M0,0 L30,15" pathLength="100" />
            <path d="M0,30 L30,15" pathLength="100" />
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
