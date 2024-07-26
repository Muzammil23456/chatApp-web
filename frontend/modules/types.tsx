import { Dispatch, SetStateAction } from "react";

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    picture: string;
    status: string;
    description: string;
    chatRoom: string[];
    refreshToken: string;
    lastActive: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ChatRoom {
    _id: string;
    users: string[];
    messages: string[];
    calls: string[];
  }

  export interface Content {
    _id: string;
    type: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Call {
    _id: string;
    caller: string;
    callType: string;
    callStatus: string;
    chatRoom: string;
    callStartTime: Date;
    callEndTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Message {
    _id: string;
    sender: string;
    content: string;
    chatRoom: string;
    edited: Date;
    edit: boolean;
    deleted: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface UserObject {
    user: User | null,
    loading: boolean,
    aToken: string,
    setAToken: Dispatch<SetStateAction<string>>,
    setUser: Dispatch<SetStateAction<User | null>>,
  }