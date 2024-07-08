import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";

const ClickMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Latitude: {position.lat}, Longitude: {position.lng}
      </Popup>
    </Marker>
  );
};

const MapComponent = ({ location }) => {
  const map = useMap();

  React.useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
  }, [location, map]);

  useMapEvents({
    click(e) {
      map.setView(e.latlng, map.getZoom());
    },
  });

  return null;
};
const SelectLocation = () => {
  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&limit=1`
      );
      const result = response.data[0];
      if (result) {
        const newLocation = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
        };
        setLocation(newLocation);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const newLocation = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };
    setLocation(newLocation);

    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
  };
  const navigate = useNavigate();
  const winLocation = useLocation();
  const handleMapSubmit = () => {
    const estate = winLocation.state?.estate;
    estate.longitude = markerPosition.lng;
    estate.latitude = markerPosition.lat;
    navigate("/seller/add-property/upload-images", { state: { estate } });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <VStack spacing={4} mb={4}>
        <Box position="relative" width="300px">
          <Input
            placeholder="Search for a place"
            value={searchQuery}
            onChange={handleInputChange}
            color="white"
            borderColor={"grey"}
            focusBorderColor="brand"
            _placeholder={{ color: "gray.400" }}
          />
          {suggestions.length > 0 && (
            <List
              mt={1}
              borderRadius="md"
              boxShadow="md"
              position="absolute"
              zIndex="1000"
              width="100%"
            >
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.place_id}
                  p={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.700" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        <Button onClick={handleSearch} colorScheme="brand">
          Search
        </Button>
      </VStack>
      <Box w="80%" h="500px" boxShadow="md" rounded="md" overflow="hidden">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapComponent location={location} />
          <ClickMarker
            position={markerPosition}
            setPosition={setMarkerPosition}
          />
        </MapContainer>
      </Box>
      {markerPosition && (
        <Button
          onClick={handleMapSubmit}
          mt={5}
          colorScheme="teal"
          size="lg"
          width="30%"
        >
          Next
        </Button>
      )}
    </Flex>
  );
};

export default SelectLocation;
