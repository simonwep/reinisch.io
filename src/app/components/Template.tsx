import {Fragment, FunctionalComponent, h} from 'preact';

type Props = {
    if: boolean;
};

export const Template: FunctionalComponent<Props> = props => {
    return props.if ? <Fragment>{props.children}</Fragment> : null;
};
