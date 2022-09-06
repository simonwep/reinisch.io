import { Card } from '@components/Card';
import { FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import styles from './SkillCard.module.scss';

interface Props {
    name: string;
    summary: string;
    icon: JSXInternal.Element;
    content: JSXInternal.Element;
    onFlip?: (open: boolean) => void;
}

export const SkillCard: FunctionalComponent<Props> = (props) => {
    return (
        <Card
            className={styles.skillCard}
            onFlip={props.onFlip}
            front={
                <div className={styles.front}>
                    <h1>{props.name}</h1>
                    <div className={styles.icon}>{props.icon}</div>
                    <article>{props.summary}</article>
                </div>
            }
            back={
                <div className={styles.back}>
                    <header>
                        <h3>{props.name}</h3>
                        <div>{props.icon}</div>
                    </header>
                    <article>{props.content}</article>
                </div>
            }
        />
    );
};
