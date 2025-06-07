import "@picocss/pico";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "dayjs/locale/th"; // โหลด locale ภาษาไทย
import dayjs from "dayjs"; // import ตัว dayjs หลัก
import buddhistEra from "dayjs/plugin/buddhistEra"; // โหลด plugin พุทธศักราช
import localizedFormat from "dayjs/plugin/localizedFormat"; // โหลด plugin แสดงวันที่แบบ localized

dayjs.locale("th");
dayjs.extend(localizedFormat);
dayjs.extend(buddhistEra);

const SelfIntroduction = ({ name = "unknown", dateOfBirth, hobbies = [] }) => {
  return (
    <div>
      <h1>
        "My name is <span style={{ color: "tomato" }}>{name}</span>."
      </h1>
      {dateOfBirth ? (
        <h2>I was born in {dayjs(dateOfBirth).format("D MMM BBBB")}</h2>
      ) : null}
      {hobbies.length > 0 ? (
        <div>
          <h2>My hobbies are:</h2>
          {hobbies.map((item, index) => (
            <div key={item}>
              {index + 1}. {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Test = ({ children }) => {
  return <h3>{children}</h3>;
};

function App() {
  const [data, setData] = useState({ name: undefined, dateOfBirth: undefined });
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hobbies, setHobbies] = useState([""]);
  console.log(hobbies);
  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr 48px",
          gap: "0.5rem",
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          style={{ gridColumn: "span 2" }}
        />
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(event) => {
            setDateOfBirth(event.target.value);
          }}
          style={{ gridColumn: "span 2" }}
        />
        {hobbies.map((item, index) => (
          <div key={index} style={{ display: "contents" }}>
            <label htmlFor={`hobby-${index}`}>Hobby {index + 1}: </label>
            <input
              id={`hobby-${index}`}
              value={item}
              onChange={(event) => {
                const newValue = event.target.value;
                const newHobbies = hobbies.map((hobby, hobbyIndex) =>
                  hobbyIndex === index ? newValue : hobby
                );
                console.log("newHobbies", newHobbies);
                setHobbies(newHobbies);
              }}
            />
            <button
              onClick={() => {
                setHobbies(
                  hobbies.filter((hobby, hobbyIndex) => {
                    if (hobbyIndex === index) {
                      return false;
                    }
                    return true;
                  })
                );
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setHobbies([...hobbies, ""]);
          }}
          style={{ gridColumn: "2", width: "max-content" }}
        >
          Add another hobby
        </button>
        <button
          onClick={() => {
            setData({ name, dateOfBirth });
            setName("");
            setDateOfBirth("");
          }}
          style={{ gridColumn: "1 / span 3", backgroundColor: "limegreen" }}
        >
          Save
        </button>
      </div>
      <SelfIntroduction
        name={data.name}
        dateOfBirth={data.dateOfBirth}
        hobbies={hobbies}
      />
    </div>
  );
}

export default App;
