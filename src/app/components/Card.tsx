import {cn} from '@utils/preact-utils';
import {FunctionalComponent} from 'preact';
import {useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import styles from './Card.module.scss';

type Props = {
    front: JSXInternal.Element;
    back: JSXInternal.Element;
    className?: string;
    onFlip?: (/* eslint-disable no-unused-vars */open: boolean) => void;
}

export const Card: FunctionalComponent<Props> = props => {
    const [open, setOpen] = useState<boolean | null>(null);

    const cardClick = () => {
        if (!open) {
            setOpen(true);
            props.onFlip?.(true);
        }
    };

    const close = (e: MouseEvent) => {
        setOpen(false);
        props.onFlip?.(false);
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className={cn(props.className, styles.card)}
             data-cursor-focus={!open}
             data-state={typeof open === 'boolean' ? open ? 'open' : 'close' : undefined}
             onClick={cardClick}>

            {/* Front */}
            <div className={styles.front}>
                {props.front}
            </div>

            {/* back */}
            <div className={styles.back}>
                <div className={styles.content}>
                    {props.back}
                </div>

                <div className={styles.close}
                     data-cursor-focus={true}
                     onClick={close}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M 8.9804688 2.9902344 A 1.0001 1.0001 0 0 0 8.2929688 3.2929688 L 4.3808594 7.2050781 A 1.0001 1.0001 0 0 0 4.3769531 8.7929688 A 1.0001 1.0001 0 0 0 4.3828125 8.796875 L 8.2929688 12.707031 A 1.0001 1.0001 0 1 0 9.7070312 11.292969 L 7.4140625 9 L 17 9 C 20.877484 9 24 12.122516 24 16 C 24 19.877484 20.877484 23 17 23 L 5 23 A 1.0001 1.0001 0 1 0 5 25 L 17 25 C 21.958516 25 26 20.958516 26 16 C 26 11.041484 21.958516 7 17 7 L 7.4140625 7 L 9.7070312 4.7070312 A 1.0001 1.0001 0 0 0 8.9804688 2.9902344 z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};
