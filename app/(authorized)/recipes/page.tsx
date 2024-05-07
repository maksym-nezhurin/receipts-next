'use client';
import {Recipes} from "@/components/Recipes/Recipes";
import React, {Suspense, useEffect} from "react";
import {IRecipe} from "@/interfaces/recipe";

async function getRecipes() {
    const res = await fetch('/api/recipes');
    return res.json()
}

function RecipesPage() {
    const [recipes, setRecipes] = React.useState<IRecipe[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getRecipes();

            setRecipes(res.data);
        };
        getData().then()
    }, [])

    return (<Suspense fallback={<div>Loading...</div>}>
        <h1 className="text-4xl font-bold">Welcome to Recipients page!</h1>
        <div>this is Auth page</div>
        <Recipes recipes={recipes} />
    </Suspense>)
}

export default RecipesPage;