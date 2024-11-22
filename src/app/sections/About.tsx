import { Link } from '@components/Link';
import { PageSection } from '@components/PageSection';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import styles from './About.module.scss';

const emailLinkUrl =
    'NDM2LDM4OCw0MjAsNDMyLDQ2NCw0NDQsMjMyLDM5Niw0NDQsNDQwLDQ2NCwzODgsMzk2LDQ2NCwyNTYsNDU2LDQwNCw0MjAsNDQwLDQyMCw0NjAsMzk2LDQxNiwxODQsNDIwLDQ0NA==';

export const About: FunctionalComponent = () => {
    const [email, setEmail] = useState('');

    const hideEmail = () => setEmail('');
    const showEmail = () => {
        setEmail(
            atob(emailLinkUrl)
                .split(',')
                .map((v) => String.fromCharCode(Number(v) >> 2))
                .join(''),
        );
    };

    return (
        <PageSection id="about" title="About me">
            <div className={styles.about}>
                <p>
                    Hi! My name is Simon, and I&apos;m a Software Architect currently living in Mannheim, Germany. I
                    display passion through perfectionism.
                </p>

                <article>
                    <h1>2015</h1>
                    <p>
                        My journey began in 2015 when I discovered Java. This led me to build my first libraries and a
                        framework: <Link href="https://github.com/simonwep/java-express">Java Express</Link>. I was
                        amazed at the traction it gained and that people cared about what I had built. This was my first
                        contact with open-source software and my first time being a maintainer for a public project.
                    </p>
                </article>

                <article>
                    <h1>2016</h1>
                    <p>
                        I wanted to build user interfaces, but back then the only reasonable solution was JavaFX. This
                        quickly made me switch to HTML and CSS, where I created both{' '}
                        <Link href="https://github.com/simonwep/selection">Viselect</Link> and{' '}
                        <Link href="https://github.com/simonwep/pickr">Pickr</Link>. Shortly after, I continued with
                        VueJS and participated in a startup where I built websites for clients worldwide. During my time
                        at that startup, I worked on{' '}
                        <Link href="https://github.com/ovanta/vue-cloudfront">Vue Cloudfront</Link> and{' '}
                        <Link href="https://github.com/ambrest/vue-blogfront">Vue Blogfront</Link>.
                    </p>
                </article>

                <article>
                    <h1>2019</h1>
                    <p>
                        After realizing that our startup wouldn’t quite make it off the ground, I switched to{' '}
                        <Link href="https://preactjs.com/">Preact</Link> and started working on more technical projects,
                        such as a <Link href="https://github.com/simonwep/bavary">new programming language</Link>, a{' '}
                        <Link href="https://github.com/dot-cafe/beam.cafe">file-sharing app</Link>, and{' '}
                        <Link href="https://github.com/simonwep?tab=repositories">much more</Link>. Next to freelancing,
                        I also started working with <Link href="https://www.docker.com/">Docker</Link> and{' '}
                        <Link href="https://www.rust-lang.org/">Rust</Link> in the context of{' '}
                        <Link href="https://webassembly.org/">WebAssembly</Link>.
                    </p>
                </article>

                <article>
                    <h1>2020</h1>
                    <p>
                        The most recent project that I, together with{' '}
                        <Link href="https://github.com/NateSeymour">Nathan S.</Link>, have been working on is{' '}
                        <Link href="https://github.com/openvpn-access">OpenVPN Access</Link> — a free and open-source
                        alternative to the proprietary OpenVPN Access Server to facilitate the management of VPN users
                        at scale. Besides that, I started working as a Frontend Developer at{' '}
                        <Link href="https://www.weclapp.com/en/">weclapp</Link>.
                    </p>
                </article>

                <article>
                    <h1>2021</h1>
                    <p>
                        At <Link href="https://www.weclapp.com/en/">weclapp</Link>, I became part of a team responsible
                        for migrating a large application initially developed with Java Server Faces to a modern tech
                        stack including <Link href="https://v3.vuejs.org/">Vue3</Link>. This included evaluating
                        technologies to facilitate the transition and team-building. I was also responsible for
                        developing an SDK to integrate the new frontend into the existing backend. This also included
                        developing a full-fledged component library from scratch.
                    </p>
                </article>

                <article>
                    <h1>2022</h1>
                    <p>
                        In 2022, I decided to work more on open-source projects, the most recent one being{' '}
                        <Link href="https://github.com/simonwep/ocular">Ocular</Link>, a tool to visualize and manage
                        your private budget across the year in a simple and less overwhelming way. I also deprecated
                        many of my old projects to give those that remain more attention.
                    </p>
                </article>

                <article>
                    <h1>2023</h1>
                    <p>
                        After four years at <Link href="https://www.weclapp.com/en/">weclapp</Link>, I joined{' '}
                        <Link href="https://www.linkedin.com/company/work-safe-tec-gmbh/">WorkSafeTec</Link> as the lead
                        frontend engineer for the development of a new product. I am mainly responsible for the
                        development of the frontend architecture and the implementation of the frontend itself.
                    </p>
                </article>

                <article>
                    <h1>2024</h1>
                    <p>
                        After my first working on our product <Link href="https://www.tagideasy.de/">TagIDeasy</Link>, I
                        switched over to the role of a software architect. I am now responsible for the development of
                        the entire frontend architecture and the implementation of the frontend itself. I am also taking
                        care of the offline-first approach of our mobile app.
                    </p>
                </article>

                <p>
                    Questions? You can reach out to me over{' '}
                    <a data-cursor-focus={true} href={`mailto:${email}`} onBlur={hideEmail} onFocus={showEmail}>
                        e&#8203;m&#8203;a&#8203;i&#8203;l
                    </a>{' '}
                    :)
                </p>
            </div>
        </PageSection>
    );
};
