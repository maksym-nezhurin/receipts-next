'use client';
import Image from "next/image";
import {IRecipe} from "@/interfaces/recipe";

import styles from './Recipe.module.css';
import {LikeButton} from "@/components/LikeButton/LikeButton";
import {useState} from "react";
import {prepareDate} from "@/utils/date";
import {Ingredient} from "@/components/Ingredient/Ingredient";
import {Comment} from "@/components/Comment/Comment";
import {cn} from "@/lib/utils";

interface IProps {
    recipe: IRecipe | null;
    className?: string;
}

export const Recipe = (props: IProps) => {
    const { className, recipe } = props;
    const ingredients = recipe?.ingredients || [];
    const comments = recipe?.comments || [];
    const [isLiked, setIsLiked] = useState<boolean>(false);

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    const handleLikeClick = async () => {
        const like = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/recipes/like`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeId: recipe.id }),
        });
        const { status } = await like.json();

        setIsLiked(status === 'liked');
    }

    return (
        <div className={cn(styles.recipe, 'p-2 md:p-4 relative bg-white', className)}>
            <div className="absolute top-2 right-2">
                <LikeButton liked={isLiked} onHandleClick={handleLikeClick}/>
            </div>
            <h3 className="text-gray-400 text-xl text-center">{recipe.name}</h3>
            <div className="flex justify-between py-2">
                <div>Adding date:</div>
                <div>
                    <p className="text-gray-400">{prepareDate(recipe.created_at)}</p>
                </div>
            </div>
            <div className="flex justify-between py-2">
                <div>Preparation time:</div>
                <div>
                    <p className="text-gray-400">{recipe.prep_time}</p>
                </div>
            </div>
            <p className="text-black my-2">{recipe.description}</p>

            <div className="flex w-full">
                <Image src={recipe.image} alt={recipe.name} width={100} height={100}/>
            </div>

            {
                ingredients.length > 0 && (
                    <div className="max-w-[400px] m-auto my-4 border-2 border-amber-100 p-4 rounded-2xl">
                        <h3 className="text-center text-xl">Ingredients</h3>
                        <div>
                            {ingredients.map((ingredient, index) => (
                                <div key={index}><Ingredient ingredient={ingredient}/></div>
                            ))}
                        </div>
                    </div>
                )
            }
            {
                comments.length > 0 && (
                    <div className="container">
                        <h3 className="text-2xl">Comments</h3>
                        <ul className="list-none">
                            {comments.map((comment, index) => (
                                <div key={index}>
                                    <Comment comment={comment}/>
                                </div>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}