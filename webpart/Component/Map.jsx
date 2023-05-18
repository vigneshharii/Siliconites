import { GoogleMap, useJsApiLoader, Marker, HeatmapLayer } from '@react-google-maps/api';
import '../Styles/Mainpage.css';
import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useFirebase } from '../context/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const GetMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["visualization", "places"],
  });

  if (!isLoaded) return <>Loading....</>;
  return <Gmap />;
};

const Gmap = () => {
  let coords = { lat: 25.6208, lng: 85.1720 };
  const [selected, setSelected] = useState(null);
  const firebase = useFirebase();
  const heatmapDataArray = [];

  useEffect(() => {
    const collectionRef = getDocs(collection(firebase.firestore, "Garbage"));
    collectionRef.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const lat = data.latitude;
        const lng = data.longitude;
        const weight = data.amount;
        const location = new window.google.maps.LatLng(lat, lng);
        heatmapDataArray.push({ location, weight });
      });
    });
  }, [heatmapDataArray, firebase.firestore]);

  const handleDumpGarbage = async () => {
    if (selected) {
      const docRef = doc(firebase.firestore, "Garbage", selected.id);
      await updateDoc(docRef, { amount: selected.amount + 1 });
      // Additional logic to update the garbage amount on the server
    }
  };

  if (selected != null) coords = selected;

  return (
    <>
      <GoogleMap zoom={10} center={coords} mapContainerClassName="left_div">
        <Marker position={coords} />
        <HeatmapLayer data={heatmapDataArray} />
        <div className="places-container">
          <PlaceAutoComplete setSelected={setSelected} />
          <button onClick={handleDumpGarbage}>Dump Garbage</button>
        </div>
      </GoogleMap>
    </>
  );
};

const PlaceAutoComplete = ({ setSelected }) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const onSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={onSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Search Address" />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default GetMap;