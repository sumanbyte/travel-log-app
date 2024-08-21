import {GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox} from "@react-google-maps/api"
import {useMemo, useState, useEffect, useRef} from "react";

const GoogleMaps = ({
    radius,
    setLatitude,
    style,
    address,
    setAddress,
    latitute,
    longitude,
    setLongitude

}) => {
    const [map, setMap] = useState(null);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const center = useMemo(()=> ({lat: latitute, lng: longitude}), [latitute, longitude]);

    const changeCoordinate  = (coord, index) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setLatitude(lat)
        setLongitude(lng);
    }

    useEffect(()=> {
        map?.panTo({lat: latitute, lng: longitude})
    }, [latitute, longitude]);

    const inputRef = useRef();

    const handlePlaceChange = ()=> {
        const [place] = inputRef.current.getPlaces();
        if(place){
            setAddress(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
        }
    }

    return (
        <div className="w-full height-96">
            {
                !isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                    onLoad={(map)=> setMap(map)}
                    >
                        <StandaloneSearchBox
                        onLoad={(ref)=> inputRef.current = ref}
                        onPlacesChanged={handlePlaceChange}
                        >
                            <div className="relative ml-48 mt-[10px] w-[500px]">
                                <input type="text" className="form-control text-black rounded-full bg-white ${style}" value={address} placeholder="Search Location" onChange={(e)=> setAddress(e.target.value)}/>
                            </div>

                        </StandaloneSearchBox>
                        <button
                        className="z-50 justify-center items-center w-12 h-12 transition duration-300 rounded-full hover:bg-stone-200 bg-stone-100 border-2 border-cyan-400 absolute right-[60px] top-[10px]"
                        onClick={()=> map.panTo({lat: latitute, lng: longitude})}
                        >
                            <span className="text-xs text-black">Click me!</span>
                        </button>
                        <Marker draggable animation={google.maps.Animation}
                        onDragEnd={changeCoordinate}
                        position={{lat: latitute, lon: longitude}}
                         />
                         <Circle options={{
                            fillColor: "#FF0000",
                            strokeOpacity: 0.6,
                            strokeColor: "#FF0000",
                            strokeWeight: 2,
                            fillOpacity: 0.35
                         }} />

                    </GoogleMap>
                )
            }
        </div>
    )
}


export default GoogleMaps;