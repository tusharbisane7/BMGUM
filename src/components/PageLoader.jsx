import "../styles/pageLoader.css";

function PageLoader({ logo }) {
    return (
        <div className="page-loader">

            <div className="loader-circle">

                <div className="loader-ring"></div>

                <img
                    src={logo}
                    alt="Ganesh Mandal Logo"
                    className="loader-logo"
                />

            </div>

            <h2 className="loader-title">
                🙏 गणपती बाप्पा मोरया 🙏
            </h2>

            <p className="loader-text">
                पृष्ठ लोड होत आहे...
            </p>

            <div className="loader-loading">

                <span className="dot"></span>

                <span className="dot"></span>

                <span className="dot"></span>

            </div>

        </div>
    );
}

export default PageLoader;