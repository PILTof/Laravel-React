import { sortBy } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({
    user: null,
    token: null,
    username: null,
    globalLoading: true,
    setUser: () => {},
    setToken: () => {},
    setUsername: () => {},
    setGlobalLoading: () => {},
    getActiveUser: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [username, setUsername] = useState("");
    const [globalLoading, setGlobalLoading] = useState(true);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    useEffect(() => {
        setGlobalLoading(true);
        axiosClient
            .get("/getusers")
            .then(({ data }) => {
                const sorted = sortBy(data, ["id"]).reverse();
                setUsername(sorted[0].name);
            })
            .catch((er) => {
                setGlobalLoading(false);
                console.error(er);
            });
            if(token !== null) {
                getActiveUser();

            }
    }, []);


    const getActiveUser = () => {
            setGlobalLoading(true);
            axiosClient
                .get("/user")
                .then((data) => {
                    setUser(data);
                    setGlobalLoading(false);
                })
                .catch((er) => {
                    setGlobalLoading(false);
                    console.error(`Ошибка при вызове ContextProvider =  ${er}`);
                });
    }


    return (
        <StateContext.Provider
            value={{
                user,
                token,
                username,
                globalLoading,
                setUser,
                setToken,
                setUsername,
                setGlobalLoading,
                getActiveUser
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
