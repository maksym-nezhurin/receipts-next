'use client';
import {IRecipe, Recipes} from "@/components/Recipes/Recipes";
import React, {Suspense, useEffect} from "react";

async function getRecipes() {
    const res = await fetch('/api/recipes');
    return res.json()
}

function RecipesPage() {
    const [recipes, setRecipes] = React.useState<IRecipe[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getRecipes();
            console.log(res.data)
            setRecipes(res.data);
        };
        getData().then()
    }, [])

    return (<Suspense fallback={<div>Loadind...</div>}>
        <h1 className="text-4xl font-bold">Welcome to Recipients page!</h1>
        <div>this is Auth page</div>
        <Recipes recipes={recipes} />
    </Suspense>)
}

export default RecipesPage;