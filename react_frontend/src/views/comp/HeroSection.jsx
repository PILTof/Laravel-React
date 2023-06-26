import Spinner from "react-bootstrap/Spinner";
import { Await, Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import {sortBy} from 'lodash'
const url = import.meta.env.VITE_STORAGE_URL

export default function HeroSection(props) {
    const { user, token, setUser, setToken, getAllUsers } = useStateContext();
    const [allUsers, setAllUsers] = useState(null);
    
    useEffect(()=>{
        getAllUsers().then((res)=>{
            setAllUsers(res)
        })
    },[])

    return (
        <div>
            <div className="container">
                <div
                    style={{ paddingTop: 80, paddingBottom: 80 }}
                    className="hero_section flex_arround"
                >
                    <div
                        style={{
                            maxWidth: 300,
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 30,
                        }}
                        className="descriptions"
                    >
                        <h1>
                            Discover <br />
                            Digital Art & <br />
                            Collect NFTs
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Molestias modi ut odio nemo suscipit fugit,
                            incidunt sit repellat praesentium aspernatur debitis
                            obcaecati mollitia!
                        </p>

                        {token == null ? (
                            <Link className="btn-singin" to={"/singup"}>
                                Get Started
                            </Link>
                        ) : null}
                        <div style={{ columnGap: 20 }} className="flex">
                            <div>
                                <h3>240k+</h3>
                                <p>Total Sale</p>
                            </div>
                            <div>
                                <h3>100k+</h3>
                                <p>Auctions</p>
                            </div>
                            <div>
                                <h3>240k+</h3>
                                <p>Artists</p>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{ minWidth: 350 }}
                        className="main_hero hero_card"
                    >
                        <div style={{ minHeight: 400 }} className="card_top">
                            <Spinner
                                style={{ marginBlock: "auto" }}
                                animation="border"
                                role="status"
                            >
                                <div className="visually-hidden">
                                    Loading...
                                </div>
                            </Spinner>
                        </div>
                        <div className="card_bottom">
                            <h5 className="card_name">First user</h5>
                            <div style={{ columnGap: 10 }} className="flex">
                                {allUsers === null ? (<Spinner
                                    size="sm"
                                    style={{ marginBlock: "auto" }}
                                    animation="border"
                                    role="status"
                                >
                                    <div className="visually-hidden">
                                        Loading...
                                    </div>
                                </Spinner>) : (
                                    <img className='avatar-sm' src={url+allUsers[0].filepath} alt="" />
                                )}
                                {allUsers === null ? 'Nothing' : allUsers[0].name}
                                {/* {allUsers ? allUsers[0].name : 'Animakid'} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
