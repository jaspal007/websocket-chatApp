import { VscChevronRight } from "react-icons/vsc";

export default function ({ user, onClick }) {
  return (
    <div key={user._id} className=" m-5 px-5 hover:bg-[#dddddd]" onClick={onClick}>
      <div className="flex w-full text-end place-content-between">
        <h1 className="text-4xl text-bold">
          {user.name.charAt(0).toUpperCase() +
            user.name.substring(1).toLowerCase()}
        </h1>
        <VscChevronRight className="flex text-[#7e7e7e] text-end justify-items-end size-9 mt-5"/>
      </div>
      <div>
        <p className="text-2xl text-[#7e7e7e]">{user.username}</p>
      </div>
      <hr />
    </div>
  );
}
