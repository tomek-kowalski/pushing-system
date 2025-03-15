import headerStyle from '../styles/Header.module.css'
import LogInOut from './LogInOut';

export default function Header() {

    return (
        <>
        <header className={headerStyle.headerRow}>
            <h2 className={headerStyle.headerTitle} >System montoringu płatności</h2>
            <LogInOut/>
        </header>
        <h1 className={headerStyle.headerMainTitle}>Rozwiąż problemy z płatnościami </h1>
        </>
    );
}