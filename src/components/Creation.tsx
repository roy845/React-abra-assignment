import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { Place, PlaceEnum, PlaceType } from "../types/places.types";
import { useAppDispatch } from "../app/hooks";
import { addPlace } from "../features/placesSlice";
import { v4 as uuidv4 } from "uuid";

const Creation = () => {
  const [place, setPlace] = useState<Place>({} as Place);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requiredFields: [string, string, string] = ["name", "type", "address"];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setPlace({ ...place, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): Id | undefined => {
    e.preventDefault();
    setLoading(true);

    const missing: string[] = requiredFields.filter((key: string) => {
      const value = place[key as keyof typeof place];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (missing.length > 0) {
      setLoading(false);
      return toast.error(`Please fill in: ${missing.join(", ")}`);
    }

    if (place.name.length > 25) {
      setLoading(false);
      return toast.error("Name should be less than or equal to 25 characters");
    }

    const placeWithIdAndCreatedAt = {
      ...place,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    dispatch(addPlace(placeWithIdAndCreatedAt));
    toast.success("Place created successfully!");
    navigate("/places");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-center  mb-4 text-blue-700">
          Create place
        </h2>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Name</label>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Place Name"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Latitude
          </label>
          <input
            onChange={handleInput}
            type="number"
            name="lat"
            step="any"
            value={place.lat ?? ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 32.0853"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Longitude
          </label>
          <input
            onChange={handleInput}
            type="number"
            name="lng"
            step="any"
            value={place.lng ?? ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 34.7818"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Type</label>

          <select
            name="type"
            value={place.type}
            defaultValue={PlaceEnum.RESTAURANT}
            onChange={(e) =>
              setPlace({ ...place, type: e.target.value as PlaceType })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white text-gray-900"
          >
            <option>Restaurant</option>
            <option>Hotel</option>
            <option>Park</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Address
          </label>
          <input
            onChange={handleInput}
            type="text"
            name="address"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="123 Main St, City, Country"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Place"}
        </button>
      </form>
    </div>
  );
};

export default Creation;
