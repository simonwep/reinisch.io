import {Link} from '@components/Link';
import {PageSection} from '@components/PageSection';
import {Fragment, FunctionalComponent, h} from 'preact';
import {Presentation} from './Presentation';

export const Presentations: FunctionalComponent = () => (
    <PageSection id="presentations"
                 title="Presentations"
                 intro={
                     <Fragment>
                         Best two out of four presentations I&apos;ve created during high-school in Germany (Abitur).
                         Both made using Vue / Preact in combination
                         with <Link href="https://github.com/Simonwep/presentr">Presentr</Link> and <Link href="https://github.com/Simonwep/sassyfication">Sassyfication</Link>.
                     </Fragment>
                 }>

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
