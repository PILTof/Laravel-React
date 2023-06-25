import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import HeroSection from "./comp/HeroSection.jsx";
export default function MainPage(props) {

    

    return (
        <div>
            <HeroSection></HeroSection>
        </div>
    );
}
