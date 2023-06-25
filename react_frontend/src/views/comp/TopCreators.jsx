import { Link } from "react-router-dom";
import RocketLaunch from '../../assets/RocketLaunch.svg' 

export default function TopCreators(props) {
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
