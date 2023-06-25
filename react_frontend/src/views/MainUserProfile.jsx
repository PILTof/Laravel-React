import { useContext, useEffect, useRef, useState } from "react";
import ProfileHeader from "../assets/ProfileHeader.png";
import DefaultAvatar from "../assets/avatars/AvatarPlaceholder.svg";
import { useStateContext } from "../contexts/ContextProvider";
import { Overlay, Spinner } from "react-bootstrap";
import DiscordLogo from "../assets/DiscordLogo.svg";
import InstagramLogo from "../assets/InstagramLogo.svg";
import TwitterLogo from "../assets/TwitterLogo.svg";
import YoutubeLogo from "../assets/YoutubeLogo.svg";
import DragAndDrop from "./comp/DragAndDrop";
import axiosClient from "../axios-client";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileCards from "./comp/ProfileCards";

export default function MainUserProfile(props) {
    const { user, globalLoading, token, getActiveUser } = useStateContext();
    const navigator = useNavigate();
    if (token == null) {
        navigator("/");
    }
    const [manageOpen, setManageOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const nameRef = useRef();
    const bioRef = useRef();
    const avatarRef = useRef();
    const [avatarImage, setAvatarImage] = useState();
    // Открыть менеджер Пользователя
    const onClick = (ev) => {
        ev.preventDefault();
        setManageOpen(!manageOpen);
    };
    // Сабмит на редактирование своего аккаунта
    const onSubmit = (ev) => {
        ev.preventDefault();
        const name = nameRef.current.value;
        const bio = bioRef.current.value;
        const id = user.data.id;
        if (name == "") {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
            return;
        } else {
            const payload = {
                name: name,
                bio: bio,
            };
            axiosClient
                .post(`/updateuser/${id}`, payload)
                .then((res) => {
                    console.log(res);
                    getActiveUser();
                    setManageOpen(false);
                })
                .catch((er) => {
                    console.error(er);
                });
        }
    };
    // При клике на аватар
    const onAvatarClick = (ev) => {
        ev.preventDefault();
        avatarRef.current.click();
    };
    // При выборе аватарки
    const onAvatarChange = (ev) => {
        ev.preventDefault();
        console.log(ev.target.files)
        setAvatarImage(ev.target.files)
    }

    return (
        <div>
            {/* Ковёр */}
            <div className="cover">
                <img className="profile_cover_img" src={ProfileHeader} alt="" />
            </div>
            {/* Инфоблок */}
            <div className="container">
                <div className="profile">
                    {!manageOpen ? (
                        <img
                            className="profile_avatar"
                            src={DefaultAvatar}
                            alt=""
                        />
                    ) : (
                        <div>
                            <img
                                onClick={onAvatarClick}
                                className="profile_avatar_manage"
                                src={DefaultAvatar}
                                alt=""
                            />
                            <input onChange={onAvatarChange} ref={avatarRef} hidden={true} type="file" />
                        </div>
                    )}
                    <div className="profile_info">
                        {!manageOpen ? (
                            <div className="left_info">
                                <div className="profile_name">
                                    {!globalLoading ? (
                                        <h1> {user.data.name}</h1>
                                    ) : (
                                        <Spinner
                                            style={{ marginBlock: "auto" }}
                                            animation="border"
                                            role="status"
                                            size="sm"
                                        >
                                            <div className="visually-hidden">
                                                Loading...
                                            </div>
                                        </Spinner>
                                    )}
                                </div>

                                <div
                                    style={{ columnGap: 20 }}
                                    className="flex_between"
                                >
                                    <div
                                        style={{
                                            width: 100,
                                            flexDirection: "column",
                                            rowGap: 30,
                                        }}
                                    >
                                        <h4>250k+</h4>
                                        <div>Volume</div>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <h4>50k+</h4>
                                        <div>NFTs Sold</div>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <h4>3000+</h4>
                                        <div>Followers</div>
                                    </div>
                                </div>
                                <div className="profile_bio">
                                    <h4 style={{ color: "#858584" }}>Bio</h4>
                                    {!globalLoading ? (
                                        <h6> {user.data.bio}</h6>
                                    ) : (
                                        <Spinner
                                            style={{ marginBlock: "auto" }}
                                            animation="border"
                                            role="status"
                                            size="sm"
                                        >
                                            <div className="visually-hidden">
                                                Loading...
                                            </div>
                                        </Spinner>
                                    )}
                                </div>
                                <div className="profile_bio">
                                    <h4 style={{ color: "#858584" }}>Links</h4>
                                    <div className="link_group">
                                        <a href="#">
                                            <img src={DiscordLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={InstagramLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={TwitterLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={YoutubeLogo} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={onSubmit}
                                className="left_info_form"
                            >
                                <div className="profile_name_form">
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        placeholder={
                                            !globalLoading
                                                ? user.data.name
                                                : null
                                        }
                                    />
                                    <button className="save-btn">Save</button>
                                </div>
                                <Overlay
                                    target={nameRef.current}
                                    show={showError}
                                    placement="top"
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
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                ...props.style,
                                            }}
                                        >
                                            Name is required
                                        </div>
                                    )}
                                </Overlay>
                                <div
                                    style={{ columnGap: 20 }}
                                    className="flex_between"
                                >
                                    <div
                                        style={{
                                            width: 100,
                                            flexDirection: "column",
                                            rowGap: 30,
                                        }}
                                    >
                                        <h4>250k+</h4>
                                        <div>Volume</div>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <h4>50k+</h4>
                                        <div>NFTs Sold</div>
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <h4>3000+</h4>
                                        <div>Followers</div>
                                    </div>
                                </div>
                                <div className="profile_bio">
                                    <h4 style={{ color: "#858584" }}>Bio</h4>
                                    <input
                                        ref={bioRef}
                                        type="text"
                                        placeholder="Ваше BIO"
                                    />
                                </div>
                                <div className="profile_bio">
                                    <h4 style={{ color: "#858584" }}>Links</h4>
                                    <div className="link_group">
                                        <a href="#">
                                            <img src={DiscordLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={InstagramLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={TwitterLogo} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={YoutubeLogo} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                        <div className="right_info">
                            <button onClick={onClick} className="btn-logout">
                                Manage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.breack_line}></div>
            {/* Ниже инфоблока */}
            <div className="container">
                {manageOpen && (
                    <div className="manage">
                        <div className="drop-card">
                            <DragAndDrop></DragAndDrop>
                        </div>
                    </div>
                )}
                {!manageOpen && (
                    <div className="profile-tabs">
                        <button
                            onClick={() => setActiveTab(1)}
                            className={`profile-tab ${
                                activeTab == 1 ? "active" : ""
                            }`}
                        >
                            <h6>Create</h6>
                        </button>
                        <button
                            onClick={() => setActiveTab(2)}
                            className={`profile-tab ${
                                activeTab == 2 ? "active" : ""
                            }`}
                        >
                            <h6>Owned</h6>
                        </button>
                        <button
                            onClick={() => setActiveTab(3)}
                            className={`profile-tab ${
                                activeTab == 3 ? "active" : ""
                            }`}
                        >
                            <h6>Collection</h6>
                        </button>
                    </div>
                )}
            </div>
            <div style={{ backgroundColor: "#3B3B3B" }}>
                {activeTab == 1 && !manageOpen ? (
                    <ProfileCards
                        loading={globalLoading}
                        name={!globalLoading && user.data.name}
                        user={user}
                    ></ProfileCards>
                ) : null}
            </div>
        </div>
    );
}

const styles = {
    breack_line: {
        paddingTop: 1,
        backgroundColor: "#3B3B3B",
        marginTop: 30,
        marginBottom: 20,
    },
};
