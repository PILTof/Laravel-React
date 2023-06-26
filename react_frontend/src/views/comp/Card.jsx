const url = import.meta.env.VITE_STORAGE_URL;
import AvatarPlaceholder from "../../assets/avatars/AvatarPlaceholder.svg";
import axiosClient from "../../axios-client";

export default function Card(props) {
    const onClick = (ev) => {
        ev.preventDefault();
        console.log("card id: " + props.post_id);
        axiosClient
            .post(`/deletePost/${props.post_id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch(({response}) => {
                console.error(response);
            });
    };
    return (
        <div className={`item-${props.row} profile-card`}>
            <div className="card-top">
                <button className="del-post-btn" onClick={onClick}>
                    <div className="line-hor"></div>
                    <div className="line-vert"></div>
                </button>
                <img width={200} height={200} src={url + props.image} alt="" />
            </div>
            <div className="card-text">
                <h5>{props.label}</h5>
                <div className="author">
                    <img src={url+props.profile_img} width={20} alt="" />
                    <span>{props.name}</span>
                </div>
                <div
                    style={{
                        justifyContent: "space-between",
                        color: "#4e4e4e",
                        fontSize: 12,
                    }}
                    className="flex"
                >
                    <span>Price</span>
                    <span>Highest Bid</span>
                </div>
                <div
                    style={{
                        justifyContent: "space-between",
                        fontSize: 14,
                    }}
                    className="flex"
                >
                    <span>{props.price} ETH</span>
                    <span>{props.bid} wETH</span>
                </div>
            </div>
        </div>
    );
}
