import React from "react";
import Typography from "@mui/material/Typography";

function ConvertTemperature(props) {
    const { temp, unit,header } = props;
    function getConvertedTemperature(temp, targetUnit) {
        switch (targetUnit) {
            case "Celcius":
                return temp - 273.15;
            case "Fahrenheit":
                return ((temp - 273.15) * 9) / 5 + 32;
            default:
                return temp;
        }
    }


    return (

        <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
            {header}: {getConvertedTemperature(temp, unit).toFixed(2)}{" "}
            {unit === "Fahrenheit" ? "°F" : "°C"}
        </Typography>
    );
}
export default ConvertTemperature;