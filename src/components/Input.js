import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { VscClose, VscCheck } from "react-icons/vsc";

export default function ({
  label,
  type,
  value,
  name,
  placeholder,
  setValue,
  valid,
  refValue,
  signup,
}) {
  const [pass, setPass] = useState(type);
  return (
    <div>
      <div className="relative flex flex-col">
        <h1 className="flex ms-5 text-3xl text-start font-serif font-extrabold self-center w-11/12">
          {label}
        </h1>
      </div>
      <div className="relative flex flex-col mt-5 mb-10">
        <input
          className="flex self-center text-center p-5 w-11/12 h-16 rounded-xl shadow-2xl shadow-slate-300 text-2xl font-bold text-[#7e7e7e] placeholder:text-start focus:drop-shadow-2xl focus:invalid:text-red-500 focus:invalid:border-8"
          type={pass}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required={true}
        />
        {type === "password" &&
          (pass === "password" ? (
            <FaRegEyeSlash
              className="bg-white text-4xl absolute inset-y-3 md:right-20 sm:right-12 align-middle"
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
        {name === "username" &&
          signup &&
          (value === "" ? (
            ""
          ) : valid && value.length > 5 ? (
            <div className="flex w-11/12 self-center">
              <VscCheck className="mt-2 text-start size-10 text-green-500" />
              <p className="mt-5 h-fit text-[#7e7e7e]">
                great work Picasso!🤌
              </p>
            </div>
          ) : (
            <div className="flex w-11/12 self-center">
              <VscClose className="mt-2 text-start size-10 text-red-500" />
              <p className="mt-5 h-fit text-[#7e7e7e]">
                {value.length <= 5
                  ? `your username should be above ${
                      6 - value.length
                    } characters...`
                  : "username invalid or already taken..."}
              </p>
            </div>
          ))}
        {name === "cpass" &&
          (value === refValue && refValue !== "" ? (
            <div className="flex mt-3 mb-6 ms-5 content-center w-11/12 self-center">
              <p className="text-[#7e7e7e]">all good...😎</p>
            </div>
          ) : value === "" ? (
            <div className="flex mt-3 mb-6 ms-5 content-center w-11/12 self-center">
              <p className="text-[#7e7e7e]">confirm password...</p>
            </div>
          ) : (
            <div className="flex mt-3 mb-6 ms-5 content-center w-11/12 self-center">
              <p className="text-[#7e7e7e]">password doesn't match</p>
            </div>
          ))}
      </div>
    </div>
  );
}
