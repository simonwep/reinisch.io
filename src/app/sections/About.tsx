import {Link} from '@components/Link';
import {PageSection} from '@components/PageSection';
import {FunctionalComponent} from 'preact';
import styles from './About.module.scss';

const emailLinkUrl = 'NDM2LDM4OCw0MjAsNDMyLDQ2NCw0NDQsMjMyLDM5Niw0NDQsNDQwLDQ2NCwzODgsMzk2LDQ2NCwyNTYsNDU2LDQwNCw0MjAsNDQwLDQyMCw0NjAsMzk2LDQxNiwxODQsNDIwLDQ0NA==';
export const About: FunctionalComponent = () => {

    // I don't want my email getting detected by webscraper, so I'm obfuscating the whole mailto stuff
    const openMailToLink = () => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = atob(emailLinkUrl)
            .split(',')
            .map(v => String.fromCharCode(Number(v) >> 2))
            .join('');

        link.click();
        document.body.removeChild(link);
    };

    return (
        <PageSection id="about" title="About me">
            <div className={styles.about}>
                <p>Hi! My name is Simon, and I&apos;m a Frontend Developer from Marburg / Germany who displays passion through perfectionism.</p>

                <article>
                    <h1>2015</h1>
                    <p>
                        My journey began in 2015 — at this time I discovered Java, which led me to build my first libraries
                        and a framework: <Link href="https://github.com/Simonwep/java-express">Java Express</Link>.
                        I was amazed at how much traction it gained, and that people cared about what I had built.
                        You could say that this was my first contact with open-source software, and it was my first time being a maintainer for a public
                        project.
                    </p>
                </article>

                <article>
                    <h1>2016</h1>
                    <p>
                        I also wanted to build user interfaces, but back then the only reasonable solution was JavaFX, and that quickly made
                        me switch to HTML and CSS, where I created
                        both <Link href="https://github.com/Simonwep/selection">SelectionJS</Link> and <Link href="https://github.com/Simonwep/pickr">Pickr</Link>.
                        Shortly after, I continued with VueJS and participated in a startup where I built websites for clients all around the world.
                        During my time at that startup, I worked on <Link href="https://github.com/ovanta/vue-cloudfront">Vue
                            Cloudfront</Link> and <Link href="https://github.com/ambrest/vue-blogfront">Vue Blogfront</Link>.
                    </p>
                </article>

                <article>
                    <h1>2019</h1>
                    <p>
                        After realizing that our startup wouldn’t quite make it off the ground, I switched to <Link href="https://preactjs.com/">Preact</Link>,
                        and started working on more technical projects, such as a <Link href="https://github.com/Simonwep/bavary">new programming
                            language</Link>, a <Link href="https://github.com/dot-cafe/beam.cafe">file-sharing
                                app</Link>, and <Link href="https://github.com/Simonwep?tab=repositories">much more</Link>.
                        Next to freelancing I also started working
                        with <Link href="https://www.docker.com/">Docker</Link>, and <Link href="https://www.rust-lang.org/">Rust</Link> in
                        the context of <Link href="https://webassembly.org/">WebAssembly</Link>.
                    </p>
                </article>

                <article>
                    <h1>2020</h1>
                    <p>
                        The most recent project that I, together with <Link href="https://github.com/NateSeymour">Nathan S.</Link>,
                        have been working on is <Link href="https://github.com/openvpn-access">OpenVPN Access</Link> — a free and open source alternative
                        to the proprietary OpenVPN Access Server to facilitate the management of VPN users at scale.
                        Besides that I started working as a Frontend Developer at <Link href="https://www.weclapp.com/en/">weclapp</Link>.
                    </p>
                </article>

                <article>
                    <h1>2022</h1>
                    <p>
                        I&apos;m currently part of a team responsible for the migration of a large application made
                        using <Link href="https://www.oracle.com/java/technologies/javaserverfaces.html"> Java Server Faces</Link> to a modern tech stack
                        including <Link href="https://v3.vuejs.org/">Vue3</Link>.
                        This includes the evaluation of technologies to facilitate the transition and team-building.
                    </p>
                </article>

                <p>Questions? You can reach out to me over <a data-cursor-focus={true} onClick={openMailToLink}>e&#8203;m&#8203;a&#8203;i&#8203;l</a> :)</p>
            </div>
        </PageSection>
    );
};
