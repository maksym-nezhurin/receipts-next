'use client';

import {FaHeart, FaHeartbeat} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {FormEvent, useEffect, useState} from "react";

interface ILikeButtonProps {
    onHandleClick: () => void;
    liked: boolean;
}

export const LikeButton = (props: any) => {
    const { liked = false, onHandleClick } = props;
    const { data: session  } = useSession();
    const { user } = session || {};
    const { accessToken } = user || { accessToken: '' };
    const showComponent = !!accessToken;

    const handleLikeClick = async (e: FormEvent) => {
        e.preventDefault();
        onHandleClick();
    }

    if (!showComponent) {
        return null;
    }

    return (
        <button onClick={handleLikeClick}>
            {liked ? <FaHeart/> : <FaHeartbeat/>}
        </button>
    );
}