import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import logo from "../assets/images/ganpati.png";

function PageTransition({ children }) {

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    const timer = setTimeout(() => {

      setLoading(false);

    }, 900);

    return () => clearTimeout(timer);

  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader logo={logo} />}
      {children}
    </>
  );
}

export default PageTransition;