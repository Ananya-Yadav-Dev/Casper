import "./Sidebar.css"

export default function Sidebar() {
    return (
        <section className="sidebar">
            <img src="src/assets/Logo.png" alt="casper logo" className="logo"></img>
            <button>
                New Chat<span><i className="fa-regular fa-comment-dots button-icon"></i></span>
            </button>
            <ul className="history">
                <li>history</li>
                <li>udhjkaxn</li>
            </ul>
            <div className="sign">
                <p>By Ananya Yadav 👩‍💻</p>
            </div>
        </section>
    )
}
