import { Box } from "@chakra-ui/react";
import React from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import config from "../../config/config";

const Map = (props) => {
  const [markers, setMarkers] = React.useState([]);
  const handleClick = ({ lngLat: [longitude, latitude] }) => {
    props.onClickonMap(longitude, latitude);
    setMarkers((markers) => [{ longitude, latitude }]);
  };
  const [viewport, setViewport] = React.useState({
    latitude: 7.329934409204016,
    longitude: 80.81450352071882,
    zoom: 7,
    pitch: 40,
    bearing: 0,
  });
  const geolocateStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  };

  const navStyle = {
    position: "absolute",
    top: 72,
    left: 0,
    padding: "10px",
  };

  const scaleControlStyle = {
    position: "absolute",
    bottom: 36,
    left: 0,
    padding: "10px",
  };
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const SIZE = 20;
  return (
    <Box data-testid="map">
      <ReactMapGL
        mapboxApiAccessToken={config.MAPBOX_ACCESSTOKEN}
        width="100%"
        height={400}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={(viewport) => setViewport(viewport)}
        {...viewport}
        onClick={handleClick}
      >
        {markers.length
          ? markers.map((m, i) => (
              <Marker data-testid = 'marker' {...m} key={i}>
                <svg
                  height={SIZE}
                  viewBox="0 0 24 24"
                  style={{
                    cursor: "pointer",
                    fill: "#d00",
                    stroke: "none",
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                  }}
                >
                  <path d={ICON} />
                </svg>
                {`${m.longitude}, ${m.latitude}`}
              </Marker>
            ))
          : null}
        <div style={geolocateStyle}>
          <GeolocateControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
      </ReactMapGL>
    </Box>
  );
};

export default Map;
