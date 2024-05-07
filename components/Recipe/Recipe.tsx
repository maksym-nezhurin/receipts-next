'use client';
import Image from "next/image";
import {IRecipe} from "@/interfaces/recipe";

import styles from './Recipe.module.css';

interface IProps {
    recipe: IRecipe | null;
}
export const Recipe = (props: IProps) => {
    const { recipe } = props;

    const ingredients = recipe?.ingredients || [];
    const comments = recipe?.comments || [];

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <div className={styles.recipe + ' p-2 md:p-4'}>
            <p className="text-gray-400 ">{recipe.name}</p>
            <p className="text-gray-400 ">{recipe.description}</p>
            {/*<p>{recipe.created_at}</p>*/}
            <p className="text-gray-400 ">{recipe.creator_id}</p>
            <Image src={recipe.image} alt={recipe.name} width={100} height={100} />
            <p className="text-gray-400 ">{recipe.prep_time}</p>
            {
                ingredients.length > 0 && (
                    <div>
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name} that has {ingredient.calories} calories</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            {
                comments.length > 0 && (
                    <div className="container">
                        <h3 className="text-2xl">Comments</h3>
                        <ul className="list-none">
                            {comments.map((comment, index) => (
                                <li key={index} className="py-3 px-2 bg-teal-500 border-1 rounded-xl text-green-800 flex flex-col">
                                    <div className="text-white">Comment from: {comment.user?.name}</div>
                                    <div className="text-center">{comment.content}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}