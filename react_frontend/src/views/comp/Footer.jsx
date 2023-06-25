import Storefront from "../../assets/Storefront.svg";
import DiscordLogo from "../../assets/DiscordLogo.svg";
import InstagramLogo from "../../assets/InstagramLogo.svg";
import TwitterLogo from "../../assets/TwitterLogo.svg";
import YoutubeLogo from "../../assets/YoutubeLogo.svg";
import axiosCLient from "../../axios-client.js";
import { useRef, useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import { useStateContext } from "../../contexts/ContextProvider";


export default function Footer(props) {
    const [showErr, setShowErr] = useState(false);
    const [showSucc, setShowSucc] = useState(false);
    const target = useRef(null);
    const [errors, setErrors] = useState([]);
    const emailRef = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
        };
        axiosCLient
            .post("/send", payload)
            .then(({ status, statusText }) => {
                console.log(status + " " + statusText);
                setShowSucc(true)
                setTimeout(()=>{
                    setShowSucc(false)
                },2500)
            })
            .catch(({ response }) => {
                console.log(response.data.message);
                setErrors([response.data.message]);
                setShowErr(true)
                setTimeout(()=>{
                    setShowErr(false)
                },2500)
            });
    };

    return (
        <div style={styles.footer}>
            <div className="container">
                <div style={styles.footer_section}>
                    <div style={styles.footer_block}>
                        <h6 style={{ fontSize: 20 }}>
                            <img src={Storefront} alt="" />
                            NFT Marketplace
                        </h6>
                        <div>
                            NFT marketplace UI created
                            <br />
                            with Anima for Figma
                        </div>
                        <div>
                            <a href="">Join out community</a>
                            <div style={styles.icon_group}>
                                <a href="">
                                    <img src={DiscordLogo} alt="" />
                                </a>
                                <a href="">
                                    <img src={YoutubeLogo} alt="" />
                                </a>
                                <a href="">
                                    <img src={TwitterLogo} alt="" />
                                </a>
                                <a href="">
                                    <img src={InstagramLogo} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div style={styles.footer_block}>
                        <h6 style={{ fontSize: 20 }}>Explore</h6>
                        <a href="">MarketPlace</a>
                        <a href="">Rankings</a>
                        <a href="">Connect a wallet</a>
                    </div>
                    <div style={styles.footer_block}>
                        <h6 style={{ fontSize: 20 }}>Join Our Weekly Digest</h6>
                        <div>
                            Get exlusive promotions & updates <br />
                            straight to your inbox
                        </div>
                        <form
                            onSubmit={onSubmit}
                            style={{ display: "flex", position: "relative" }}
                        >
                            <input
                                className="email_input"
                                ref={emailRef}
                                type="email"
                                placeholder="Enter your email here"
                            />
                            <button
                                ref={target}
                                className="btn-subscribe"
                            >
                                Subscribe
                            </button>
                            <Overlay
                                target={target.current}
                                show={showErr}
                                placement="bottom"
                            >
                                {({
                                    placement: _placement,
                                    arrowProps: _arrowProps,
                                    show: _show,
                                    popper: _popper,
                                    hasDoneInitialMeasure:
                                        _hasDoneInitialMeasure,
                                    ...props
                                }) => (
                                    <div
                                        {...props}
                                        style={{
                                            position: "absolute",
                                            backgroundColor:
                                                "rgba(255, 100, 100, 0.85)",
                                            padding: "2px 10px",
                                            color: "white",
                                            borderRadius: 3,
                                            ...props.style,
                                        }}
                                    >
                                        {errors !== null ? errors[0] : null}
                                    </div>
                                )}
                            </Overlay>
                            <Overlay
                                target={target.current}
                                show={showSucc}
                                placement="bottom"
                            >
                                {({
                                    placement: _placement,
                                    arrowProps: _arrowProps,
                                    show: _show,
                                    popper: _popper,
                                    hasDoneInitialMeasure:
                                        _hasDoneInitialMeasure,
                                    ...props
                                }) => (
                                    <div
                                        {...props}
                                        style={{
                                            position: "absolute",
                                            backgroundColor:
                                                "rgb(175, 55, 135, 0.85)",
                                            padding: "2px 10px",
                                            color: "white",
                                            borderRadius: 3,
                                            ...props.style,
                                        }}
                                    >
                                        Проверьте почту! {`<3`}
                                    </div>
                                )}
                            </Overlay>
                        </form>
                    </div>
                </div>
                <div style={styles.breack_line}></div>
                <div style={{ color: "grey" }}>
                    @ Pilto O`Boshes site. Designed by Anima. Used free template
                </div>
            </div>
        </div>
    );
}

const styles = {
    footer: {
        backgroundColor: "#3B3B3B",
        padding: 48,
    },
    footer_section: {
        display: "flex",
        justifyContent: "space-between",
    },
    footer_block: {
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
        textAlign: "left",
    },
    icon_group: {
        display: "flex",
        marginTop: 10,
        columnGap: 10,
    },
    breack_line: {
        paddingTop: 1,
        backgroundColor: "#858584",
        marginTop: 30,
        marginBottom: 20,
    },
};
