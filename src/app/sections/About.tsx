import {Link} from '@components/Link';
import {PageSection} from '@components/PageSection';
import {FunctionalComponent, h} from 'preact';
import styles from './About.module.scss';

const emailLinkUrl = 'NDM2LDM4OCw0MjAsNDMyLDQ2NCw0NDQsMjMyLDM5Niw0NDQsNDQwLDQ2NCwzODgsMzk2LDQ2NCwyNTYsNDU2LDQwNCw0MjAsNDQwLDQyMCw0NjAsMzk2LDQxNiwxODQsNDIwLDQ0NA==';
export const About: FunctionalComponent = () => {

    // I don't want my email getting detected by webscraper so I'm obfuscating the whole mailto stuff
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
        <PageSection id="about"
                     title="About me">
            <div className={styles.about}>
                <p>Hi! My name is Simon, and I&apos;m a Frontend developer from Marburg / Germany who loves working things out in great detail.</p>

                <article>
                    <span>2015</span>
                    <p>
                        My journey began in 2015 — at this time I discovered java which led me into building my first libraries
                        and a framework: <Link href="https://github.com/Simonwep/java-express">Java Express</Link>.
                        I was amazed by how much traction it gained and that people cared about what you&apos;ve build.
                        One could say that this was my first contact with open-source software and being a maintainer for a public project.
                    </p>
                </article>

                <article>
                    <span>2016</span>
                    <p>
                        I also wanted to build user interfaces, back then the only reasonable solution was JavaFX which quickly made
                        me switch into HTML and CSS, where I created
                        both <Link href="https://github.com/Simonwep/selection">SelectionJS</Link> and <Link href="https://github.com/Simonwep/pickr">Pickr</Link>.
                        Shortly after I continued with vue and participated in a startup where I&apos;ve build websites for clients all around the world.
                        During my time at the startup, I worked on <Link href="https://github.com/ovanta/vue-cloudfront">Vue
                            Cloudfront</Link> and <Link href="https://github.com/ambrest/vue-blogfront">Vue Blogfront</Link>.
                    </p>
                </article>

                <article>
                    <span>2018</span>
                    <p>
                        After we had figured that our startup didn&apos;t quite succeed, I switched to <Link href="https://preactjs.com/">Preact</Link> and
                        started working on
                        more in-depth and sophisticated projects such as a <Link href="https://github.com/Simonwep/bavary">new programming
                            language</Link>, a <Link href="https://github.com/dot-cafe/beam.cafe">file-sharing
                                app</Link> and <Link href="https://github.com/Simonwep?tab=repositories">much more</Link>.
                        I also started working
                        with <Link href="https://www.docker.com/">Docker</Link> and <Link href="https://www.rust-lang.org/">Rust</Link> in
                        the context of <Link href="https://webassembly.org/">WebAssembly</Link>.
                    </p>
                </article>

                <article>
                    <span>2020</span>
                    <p>
                        The most recent project which I, together with <Link href="https://github.com/NateSeymour">Nathan S.</Link>,
                        worked on is <Link href="https://github.com/openvpn-access">OpenVPN Access</Link> — a free and open source alternative
                        to the proprietary openvpn-access to manage vpn-users at scale.
                    </p>
                    <p>
                        At this time, since 2020, I&apos;m working at <Link href="https://www.weclapp.com/en/">weclapp</Link> as a frontend developer.
                        And when I code privately, I&apos;ll probably be working on things which can be found
                        on <Link href="https://github.com/Simonwep">GitHub/Simonwep</Link>.
                    </p>
                </article>

                <p>Questions? You can reach out to me over <a data-cursor-focus={true} onClick={openMailToLink}>e&#8203;m&#8203;a&#8203;i&#8203;l</a> :)</p>
            </div>
        </PageSection>
    );
};
