import {cn} from '@utils/preact-utils';
import {FunctionalComponent, h} from 'preact';
import {useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import styles from './Card.module.scss';

type Props = {
    front: JSXInternal.Element;
    back: JSXInternal.Element;
    className?: string;
}

export const Card: FunctionalComponent<Props> = props => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <div className={cn(props.className, styles.card)}
             data-cursor-focus={true}
             data-state={typeof open === 'boolean' ? open ? 'open' : 'close' : undefined}
             onClick={() => setOpen(!open)}>

            {/* Front */}
            <div className={styles.front}>
                {props.front}
            </div>

            {/* back */}
            <div className={styles.back}>
                {props.back}
            </div>
        </div>
    );
};
