import {Link} from '@components/Link';
import {PageSection} from '@components/PageSection';
import {FunctionalComponent} from 'preact';
import pileckiJpg from './images/pilecki.jpg';
import pileckiWebP from './images/pilecki.webp';
import snowdenJpg from './images/snowden.jpg';
import snowdenWebP from './images/snowden.webp';
import {Presentation} from './Presentation';

export const Presentations: FunctionalComponent = () => (
    <PageSection id="presentations"
                 title="Presentations"
                 intro={
                     <>
                         Best two out of four presentations I&apos;ve created during high-school in Germany (Abitur).
                         Both made using Vue / Preact in combination
                         with <Link href="https://github.com/Simonwep/presentr">Presentr</Link> and <Link href="https://github.com/Simonwep/sassyfication">Sassyfication</Link>.
                     </>
                 }>

        <Presentation link="/p/pilecki"
                      title="Witold Pilecki"
                      date="April 2020"
                      description="Story about a war hero."
                      images={[pileckiWebP, pileckiJpg]}/>

        <Presentation link="/p/snowden"
                      title="Edward Snowden"
                      date="January 2019"
                      description="Rough introduction into the life of Edward Snowden."
                      images={[snowdenWebP, snowdenJpg]}/>
    </PageSection>
);
