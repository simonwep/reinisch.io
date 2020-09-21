import {Link} from '@components/Link';
import {Fragment, FunctionalComponent, h} from 'preact';
import {PageSection} from '@components/PageSection';
import {Presentation} from './Presentation';

export const Presentations: FunctionalComponent = () => {

    return (
        <PageSection id="presentations"
                     intro={
                         <Fragment>
                             Best two out of four presentations I&apos;ve created during high-school in Germany (Abitur).
                             Both made using Vue / Preact in combination
                             with <Link href="https://github.com/Simonwep/presentr">Presentr</Link> and <Link href="https://github.com/Simonwep/sassyfication">Sassyfication</Link>.
                         </Fragment>
                     }
                     title="Presentations"
                     index={1}>

            <Presentation link="/p/pilecki"
                          title="Witold Pilecki"
                          date="April 2020"
                          description="Story about a war hero."
                          images={[
                              require('./images/pilecki.webp').default,
                              require('./images/pilecki.jpg').default
                          ]}/>

            <Presentation link="/p/snowden"
                          title="Edward Snowden"
                          date="January 2019"
                          description="Rough introduction into the life of Edward Snowden."
                          images={[
                              require('./images/snowden.webp').default,
                              require('./images/snowden.jpg').default
                          ]}/>
        </PageSection>
    );
};