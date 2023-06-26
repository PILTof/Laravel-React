import { Link } from "react-router-dom";
import RocketLaunch from '../../assets/RocketLaunch.svg' 
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";

export default function TopCreators(props) {
     const {getAllUsers} = useStateContext();
     const [allUsers, setAllUsers] = useState();

    useEffect(()=>{
        getAllUsers().then((res)=>{
            console.log(res)
            setAllUsers(res)
        })
    },[])

    return (
        <div>
            <div className="container">
                <header style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <h1>Top Creators</h1>
                        <p>Checkout Top Rated Creators on the NFT Marketplace</p>
                    </div>
                    <div>
                        <Link className="btn-view-rankings" to={'/'}><img src={RocketLaunch} alt="" />View Rankings</Link>
                    </div>
                </header>
                <div style={{marginTop:60,marginBottom:60}}>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
