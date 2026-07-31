import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import {

    FaSignInAlt,

    FaUserPlus,

    FaTimes,

    FaHandHoldingHeart,

} from "react-icons/fa";


import "../styles/loginPopup.css";
const LoginPopup = ({

    isOpen,

    onClose,

    onLogin,

    onRegister,

}) => {

    return (

        <AnimatePresence>

            {isOpen && (

                <motion.div

                    className="login-popup-overlay"

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    exit={{ opacity: 0 }}

                >

                    <motion.div

                        className="login-popup-card"

                        initial={{

                            opacity: 0,

                            scale: 0.8,

                            y: 50,

                        }}

                        animate={{

                            opacity: 1,

                            scale: 1,

                            y: 0,

                        }}

                        exit={{

                            opacity: 0,

                            scale: 0.85,

                            y: 30,

                        }}

                        transition={{

                            duration: 0.35,

                        }}

                    >

                        <div className="popup-glow"></div>

                        <div className="popup-shine"></div>

                        <button

                            className="popup-close"

                            onClick={onClose}

                        >

                            <FaTimes />

                        </button>

                        <div className="popup-icon">

                            <FaHandHoldingHeart />

                        </div>

                        <h2>

                            ऑनलाइन देणगी

                        </h2>

                        <p>

                            श्री गणरायाच्या सेवेसाठी ऑनलाइन देणगी देण्यासाठी

                            कृपया प्रथम <strong>लॉगिन</strong> करा

                            किंवा <strong>नवीन खाते तयार</strong> करा.

                        </p>

                        <div className="popup-buttons">

                            <button

                                className="login-btn"

                                onClick={onLogin}

                            >

                                <FaSignInAlt />

                                <span>

                                    लॉगिन करा

                                </span>

                            </button>

                            <button

                                className="register-btn"

                                onClick={onRegister}

                            >

                                <FaUserPlus />

                                <span>

                                    नवीन नोंदणी

                                </span>

                            </button>

                        </div>

                        <button

                            className="later-btn"

                            onClick={onClose}

                        >

                            आत्ता नाही

                        </button>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

};

export default LoginPopup;