import ImagePlaceholder from "../../assets/nfts/Image Placeholder.png";
import ImagePlaceholder_1 from "../../assets/nfts/Image Placeholder-1.png";
import ImagePlaceholder_2 from "../../assets/nfts/Image Placeholder-2.png";
import AvatarPlaceholder from "../../assets/avatars/AvatarPlaceholder.svg";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Card from "./Card";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProfileCards(props) {
    const [loading, setLoading] = useState(true);
    const { user, globalLoading, getActiveUser } = useStateContext();
    const [cards, setCards] = useState([]);


    useEffect(() => {
        setLoading(true);
        let id = localStorage.getItem('USER_ID');
        axiosClient
            .get(`/getpost/user/${id}`)
            .then(({ data }) => {
                setLoading(false);
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push(
                        <Card
                            row={i}
                            price={data[i].price}
                            bid={data[i].bid}
                            label={data[i].label}
                            image={data[i].filepath}
                            key={data[i].id}
                            name={props.name}
                            post_id={data[i].id}
                        ></Card>
                    );
                }
                setCards(arr);
            })
            .catch((rej) => {
                console.log(rej);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 200,
                    }}
                >
                    <Spinner
                        style={{ marginBlock: "auto" }}
                        animation="border"
                        role="status"
                    >
                        <div className="visually-hidden">Loading...</div>
                    </Spinner>
                </div>
            ) : (
                <div className="profile-cards">{cards}</div>
            )}
        </div>
    );
}
