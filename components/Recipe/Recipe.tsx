'use client';
import Image from "next/image";
import {IRecipe} from "@/components/Recipes/Recipes";

interface IProps {
    recipe: IRecipe | null;
}
export const Recipe = (props: IProps) => {
    const { recipe } = props;

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <>
            <p>{recipe.name}</p>
            <p>{recipe.description}</p>
            {/*<p>{recipe.created_at}</p>*/}
            <p>{recipe.creator_id}</p>
            <Image src={recipe.image} alt={recipe.name} width={100} height={100} />
            <p>{recipe.prep_time}</p>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}