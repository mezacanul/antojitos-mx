"use client";
import { getCities } from "@/lib/data/geo";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

export function CitySelector({
  control,
  spreadProps,
}: {
  control: any;
  spreadProps: any;
}) {
  const selectedStateId = useWatch({
    control,
    name: "stateId",
  });
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    console.log("selectedStateId:", selectedStateId);
    const fetchCities = async () => {
      setCities([]);
      const cities = await getCities(selectedStateId);
      console.log("cities:", cities);
      setCities(cities);
    };
    if (
      selectedStateId !== undefined &&
      selectedStateId !== ""
    ) {
      fetchCities();
    }
  }, [selectedStateId]);
  // const state = useMemo(() => {
  //   return selectedState.state;
  // }, [selectedState]);
  // console.log("selectedState:", selectedState);
  if (
    selectedStateId === undefined ||
    selectedStateId === ""
  ) {
    return null;
  }
  return (
    <select className="input-text" {...spreadProps}>
      <option value="" disabled>
        Selecciona una ciudad
      </option>
      {cities.length > 0 &&
        cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
    </select>
  );
}
