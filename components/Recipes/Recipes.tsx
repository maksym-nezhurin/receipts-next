'use client';
import Image from "next/image";
import styles from './Recipes.module.css';
import Link from "next/link";
import {Recipe} from "@/components/Recipe/Recipe";
import {IRecipe} from "@/interfaces/recipe";

interface IProps {
    recipes: IRecipe[];
}

const renderRecipes = (recipes: IRecipe[] = []) => {
    return recipes.map((recipe) => {
        return (
            <div key={recipe.id} className={styles.recipe}>
                <Link href={`recipes/${recipe.id}`}>
                    <Recipe recipe={recipe} />
                </Link>
            </div>
        );
    });
}

export const Recipes = (props: IProps) => {
    const { recipes } = props;
    return <div className={''}>
        <div className={'w-full'}>
            <h2 className="text-center">Recipes:</h2>
        </div>
        <div className={styles.recipes}>
            {renderRecipes(recipes)}
        </div>
    </div>;
}