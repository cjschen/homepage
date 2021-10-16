
export default function FooterLogo(props) {
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            <img src={props.src} alt={props.name + "-logo"} className="logo footer-logo" />
        </a>
    );
}