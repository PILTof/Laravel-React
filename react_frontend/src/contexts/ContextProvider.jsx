import { sortBy } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({
    user: null,
    token: null,
    globalLoading: true,
    setUser: () => {},
    setToken: () => {},
    setGlobalLoading: () => {},
    getActiveUser: () => {},
    getAllUsers: () => {},
    getPostsByUserId: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [allUsers, setAllUsers] = useState([null]);
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
        if (token !== null) {
            getActiveUser();
        }
    }, []);

    async function getAllUsers() {
        let out_data = [];
        await axiosClient
            .get("/getusers")
            .then(({ data }) => {
                out_data = data;
            })
            .catch((er) => {
                console.error(er);
            });
        return out_data;
    };

    async function getPostsByUserId(id) {
        let out = [];
        await axiosClient
            .get(`/getposts/user/${id}`)
            .then((res)=>{
                out = res
            })
            .catch((err) => {
                console.log(err)
            })
        return out
    }

    async function getActiveUser ()  {
        let out = [];
        setGlobalLoading(true);
        await axiosClient
            .get("/user")
            .then((data) => {
                setUser(data);
                localStorage.removeItem("USER_ID");
                localStorage.removeItem("USER_NAME");
                localStorage.setItem("USER_ID", data.data.id);
                localStorage.setItem("USER_NAME", data.data.name);
                setGlobalLoading(false);
                out = data
            })
            .catch((er) => {
                setGlobalLoading(false);
                console.error(`Ошибка при вызове ContextProvider =  ${er}`);
            });
        return out
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                globalLoading,
                setUser,
                setToken,
                setGlobalLoading,
                getActiveUser,
                getAllUsers,
                getPostsByUserId
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
