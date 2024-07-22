import { Dispatch, SetStateAction } from "react";

export interface User {
    id: string;
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
    id: string;
    users: string[];
    messages: string[];
    calls: string[];
  }

  export interface Content {
    id: string;
    type: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Call {
    id: string;
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
    id: string;
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
    token: string,
  }