import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const Legend = () => {
    const [selectedLayer, setSelectedLayer] = useState(sessionStorage.getItem('setting'));
    const [unit, setUnit] = useState(sessionStorage.getItem('unit'));
    const map = useMap();
    function getConvertedTemperature(temp, targetUnit) {
        switch (targetUnit) {
            case "Celsius":
                return `${parseInt(temp - 273.15)}°C`;
            case "Fahrenheit":
                return `${(parseInt(((temp - 273.15) * 9) / 5 + 32))} °F`;
            default:
                return temp;
        }
    }
    
    useEffect(() => {
        function getInner(layer, unit) {
            if (layer === 'TA2') {
                if (unit === 'Celsius') {
                    return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Air temperature</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #821692"></span> < -40°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #8257DB"></span> - 30°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #208CEC"></span> - 20°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #20C4E8"></span> - 10°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #23DDDD"></span> 0°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #C2FF28"></span> 10°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FFF028"></span> 20°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FFC228"></span> 25°C</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FC8014"></span> > 30°C</div>
                </div>
              `
                } else {
                    return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Air temperature</div>
                  <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #821692"></span> < -40°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #8257DB"></span> - 22°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #208CEC"></span> - 4°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #20C4E8"></span> 14°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #23DDDD"></span> 32°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #C2FF28"></span> 50°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FFF028"></span> 68°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FFC228"></span> 77°F</div>
                    <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FC8014"></span> > 86°F</div>
                </div>
              `
                }
            }
            else if (layer === 'CL') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Cloudiness</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F7F7FF66"></span> < 50 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F6F5FF8C"></span> 60 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F4F4FFBF"></span> 70 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #E9E9DFCC"></span> 80 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #DEDEDED8"></span> 90 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #D2D2D2FF"></span> 100 %</div>
                </div>
              `
            }
            else if (layer === 'PA0') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Accumulated Precipitation</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00000000"></span>0 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #C8969600"></span>0.1 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #9696AA00"></span>0.2 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #7878BE19"></span>0.5 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #6E6ECD33"></span>1 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #5050E1B2"></span>10 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #1414FFE5"></span>140 mm</div>
                </div>
                `
            }
            else if (layer === 'PAR0') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Accumulated Rain</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #E1C86400"></span>0 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #C8963200"></span>0.1 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #9696AA00"></span>0.2 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #7878BE00"></span>0.5 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #6E6ECD4C"></span>1 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #5050E1B2"></span>10 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #1414FFE5"></span>140 mm</div>
                </div>
                `
            }
            else if (layer === 'PAS0') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Accumulated Snow</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00000000"></span>0 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00D8FFFF"></span>5 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00B6FFFF"></span>10 mm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #9549FF"></span>25 mm</div>
                </div>
                `
            }
            else if (layer === 'APM') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Atmospheric pressure</div>
                <div style = "font-weight: bold">On mean sea level</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #0073FF"></span>94000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00AAFF"></span>96000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #4BD0D6"></span>98000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #8DE7C7"></span>100000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #B0F720"></span>101000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F0B800"></span>102000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FB5515"></span>104000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F3363B"></span>106000 hPa</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #C60000"></span>108000 hPa</div>
                </div>
                `
            }
            else if (layer === 'HRD0') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Relative humidity</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #db1200"></span>0 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #965700"></span>20 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #ede100"></span>40 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #8bd600"></span>60 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #00a808"></span>80 %</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #000099"></span>100 %</div>
                </div>
                `
            }
            else if (layer === 'WND') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Wind speed</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FFFFFF00"></span>1 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #EECECC66"></span>5 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #B364BCB3"></span>15 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #3F213BCC"></span>25 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #744CACE6"></span>50 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #4600AFFF"></span>100 m/s</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #0D1126FF"></span>200 m/s</div>
                </div>
                `
            }
            else if (layer === 'TS0') {
                return `
                <div style="text-align: left; background: white; padding-left: 5px";>
                <h4>Weather Map Legend</h4>
                <div style="font-weight: bold">Soil temperature 0-10 сm</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #491763"></span>${getConvertedTemperature(203.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #4E1378"></span>${getConvertedTemperature(228.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #514F9B"></span>${getConvertedTemperature(235.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #446DA9"></span>${getConvertedTemperature(239.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #5C85B7"></span>${getConvertedTemperature(243.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #739FC5"></span>${getConvertedTemperature(247.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #88A7C9"></span>${getConvertedTemperature(251.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #6CBCD4"></span>${getConvertedTemperature(255.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #87CADC"></span>${getConvertedTemperature(259.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #A7D8E5"></span>${getConvertedTemperature(263.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #A7D5AD"></span>${getConvertedTemperature(267.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #D2E9C8"></span>${getConvertedTemperature(271.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #FEFEBB"></span>${getConvertedTemperature(275.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F5CEBB"></span>${getConvertedTemperature(279.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #F2B68A"></span>${getConvertedTemperature(283.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #EE934F"></span>${getConvertedTemperature(287.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #EB702D"></span>${getConvertedTemperature(291.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #E8706E"></span>${getConvertedTemperature(295.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #CC2C44"></span>${getConvertedTemperature(303.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #CC0000"></span>${getConvertedTemperature(313.15, unit)}</div>
                <div><span style="display: inline-block; width: 10px; height: 10px; margin-right: 5px; background: #990000"></span>${getConvertedTemperature(323.15, unit)}</div>
                `
        }
        }
        const interval = setInterval(() => {
            const storedSetting = sessionStorage.getItem('setting');
            if (storedSetting === null) {
                sessionStorage.setItem("setting", "TA2");
            }
            if (selectedLayer !== storedSetting) {
                setSelectedLayer(storedSetting);
            }
            const storedUnit = sessionStorage.getItem('unit');
            if (storedUnit === null) {
                sessionStorage.setItem("unit", "Celsius");
            }
            if (unit !== storedUnit) {
                setUnit(storedUnit);
            }
        }, 100); // Check for updates every 100ms (0.1 second)
        // Clean up the interval when the component unmounts
        const legendControl = L.control({ position: "bottomright" });

        legendControl.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            // Add your legend content here, for example:
            div.innerHTML = getInner(selectedLayer, unit);
            return div;
        };

        legendControl.addTo(map);
        return () => {
            clearInterval(interval);
            legendControl.remove();
        }
    }, [selectedLayer, unit, map]);
    return null;
};

export default Legend;