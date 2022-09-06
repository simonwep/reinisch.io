import { LoadingScreen } from '@components/LoadingScreen';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';

export const App: FunctionalComponent = () => {
    const [Content, setContentComponent] = useState<JSXInternal.Element>();

    useEffect(() => {
        void import('./Content').then((module) => setContentComponent(<module.Content />));
    }, []);

    return (
        <>
            {/* Loading screen */}
            <LoadingScreen loaded={!!Content} />

            {/* Actual content */}
            {Content}
        </>
    );
};
