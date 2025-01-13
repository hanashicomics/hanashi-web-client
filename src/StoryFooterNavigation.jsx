import './assets/styles/Navigation.css'

export default function RootNavigation(){
    return(
        <>
            <div className="NavigationLinks">
                <li><a href="#home">Info</a></li>
                <li><a href="#news">Timeline</a></li>
                <li><a href="#contact">Arcs</a></li>
                <li><a href="#contact">Characters</a></li>
            </div>
        </>
    )
}