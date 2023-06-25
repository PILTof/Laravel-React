import { useEffect, useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import ImagePlaceholder from "../assets/ImagePlaceholder.svg";
import EnvelopeSimple from "../assets/inputs/EnvelopeSimple.svg";
import LockKey from "../assets/inputs/LockKey.svg";
import User from "../assets/inputs/User.svg";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Singup(props) {
    const navigator = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState();

    const { user, token, setUser, setToken, getActiveUser } = useStateContext();

    

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/singup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setErrors(null);
                getActiveUser();
                navigator('/profile')
                console.log(data)
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                } else {
                    console.error(err)
                }
            });
    };

    return (
        <div
            style={{ display: "flex", columnGap: 50, justifyContent: "center" }}
        >
            <div>
                <Image src={ImagePlaceholder} fluid></Image>
            </div>
            <form
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 10,
                }}
            >
                <h1>Create Account</h1>
                <p>
                    Welcome! Enter Your Details And Start <br />
                    Create, Collecting And Selling NFTs
                </p>
                <div style={{ ...styles.input_group, ...{ marginRight: 30 } }}>
                    {errors &&
                        Object.keys(errors).map((el) => {
                            return (
                                <Button variant="danger" key={el}>
                                    {errors[el]}
                                </Button>
                            );
                        })}
                    <div style={{ position: "relative" }}>
                        <input
                            className="email_input"
                            ref={nameRef}
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <input
                        className="email_input"
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        className="email_input"
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        className="email_input"
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <button
                    style={{ marginRight: 30, marginBottom: 0 }}
                    className="btn-singin"
                >
                    Create Account
                </button>
                <Link
                    to={"/login"}
                    style={{
                        marginRight: 30,
                        marginBottom: 30,
                        backgroundColor: "#2B2B2B",
                        cursor: "pointer",
                    }}
                    className="btn-singin"
                >
                    Already have?
                </Link>
            </form>
        </div>
    );
}

const styles = {
    input_group: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10,
    },
};
