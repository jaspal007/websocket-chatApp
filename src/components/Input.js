import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ({ label, type, value, name, placeholder, setValue }) {
  const [pass, setPass] = useState(type);
  return (
    <div>
      <h1 className="ms-5 text-3xl text-start font-serif font-extrabold">
        {label}
      </h1>
      <div className="relative flex">
        <input
          className=" mx-5 mb-10 p-5 w-11/12 h-16 rounded-xl drop-shadow-2xl shadow-slate-300 text-2xl text-center font-bold text-[#7e7e7e] placeholder:text-start"
          type={pass}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={e=>setValue(e.target.value)}
        />
        {type === "password" &&
          ((pass==='password') ? (
            <FaRegEyeSlash
              className="p-0.5 bg-white text-4xl absolute inset-y-3.5 right-11"
              onClick={(e) => {
                setPass("text");
              }}
            />
          ) : (
            <FaRegEye
              className="p-0.5 bg-white text-4xl absolute inset-y-3.5 right-11"
              onClick={(e) => {
                setPass(type);
              }}
            />
          ))}
      </div>
    </div>
  );
}
