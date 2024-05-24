'use client';

import {FaHeart, FaHeartbeat} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {FormEvent, useEffect, useState} from "react";

interface ILikeButtonProps {
    onHandleClick: () => void;
    liked: boolean;
    amount: number;
}

export const LikeButton = (props: ILikeButtonProps) => {
    const {liked = false, amount, onHandleClick} = props;
    const {data: session} = useSession();
    const {user} = session || {};
    // @ts-ignore
    const {accessToken} = user || {accessToken: ''};
    const showComponent = !!accessToken;

    const handleLikeClick = async (e: FormEvent) => {
        e.preventDefault();
        onHandleClick();
    }

    if (!showComponent) {
        return null;
    }

    return (<>
            <span>{amount}</span>
            <button onClick={handleLikeClick}>
                {liked ? <FaHeart/> : <FaHeartbeat/>}
            </button>
        </>

    );
}