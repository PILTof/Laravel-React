import { useRef } from "react";

export default function Marketplace(props) {
    const input = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(input.current.value);
    };

    return (
        <div>
            <div className="container">
                <div className="browse">
                    <h1>Browse Marketplace</h1>
                    <p>
                        Browse through more than 50k NFTs on th NFT Marketplace
                    </p>
                    <form onSubmit={onSubmit} action="">
                        <div className="flex_center">
                            <input
                                className="search_input"
                                ref={input}
                                placeholder="Search your favorite NFTs"
                                type="text"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div style={styles.breack_line}></div>
            <div className="container">
                
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