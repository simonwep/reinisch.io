import {cn} from '@utils/preact-utils';
import {FunctionalComponent} from 'preact';
import styles from './RunningBanner.module.scss';

interface Props {
    className: string;
    text: string;
}

export const RunningBanner: FunctionalComponent<Props> = ({text, className}) => (
    <div className={cn(styles.runningBanner, className)}
         style={`--items: ${text.length}`}>
        {[...text].map((char, index) =>
            <span key={index} style={`--index: ${index}`}>
                {char}
            </span>
        )}
    </div>
);
