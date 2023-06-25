import { Link, Navigate, useNavigate } from "react-router-dom";
import Storefront from "../../assets/Storefront.svg";
import User_img from "../../assets/User.svg";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export default function Header(props) {
    const { user, token, setUser, setToken } = useStateContext();
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const onLogout = (ev) => {
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            navigate('/')
        });
    };
    const onMouseEnter = () => {
        setOpen(true);
    };
    const onMouseLeave = () => {
        setOpen(false);
    };

    return (
        <div style={styles.header}>
            <nav style={styles.header_inner}>
                <div style={styles.flex_row}>
                    <img src={Storefront} alt="" />
                    <h3>
                        <Link to={"/"}>NFT Marketplace</Link>
                    </h3>
                </div>
                <nav style={styles.header_nav}>
                    <Link to={"/marketplace"}>Marketplace</Link>
                    <Link to={"/"}>Rankings</Link>
                    <Link to={"/"}>Connect a wallet</Link>

                    {token !== null ? (
                        <div className="btn-handler">
                            <Link
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                className="btn-singup"
                                to={"/profile"}
                            >
                                <img src={User_img} alt="" />
                                Profile
                            </Link>
                            {isOpen && (
                                <div
                                    style={{ position: "absolute", zIndex: 0 }}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                >
                                    <button
                                        onClick={() => onLogout()}
                                        className="btn-logout"
                                    >
                                        <img src={User_img} alt="" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link className="btn-singup" to={"/singup"}>
                            <img src={User_img} alt="" />
                            Sing Up
                        </Link>
                    )}
                </nav>
            </nav>
        </div>
    );
}

const styles = {
    header: {},
    header_inner: {
        margin: "auto",
        paddingInline: 40,
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
    },
    header_nav: {
        display: "flex",
        columnGap: 30,
        alignItems: "center",
        fontWeight: 500,
    },
    flex_row: {
        display: "flex",
        justifyContent: "center",
        columnGap: 15,
    },
};
