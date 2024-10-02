import React from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export function Medications(){
    const nav = useNavigate();
    const handleClick =() => {
        nav('/medications/details');
    }
    return(
        <div>
            Medications page
            <Button onClick={handleClick}>
                test
            </Button>
        </div>
    )
}