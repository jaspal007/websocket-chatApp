import { io } from "socket.io-client";

export function Socket(){
    const socket = io();
    return socket;
}