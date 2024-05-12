'use client';
import {Recipes} from "@/components/Recipes/Recipes";
import React, {Suspense, useEffect} from "react";
import {IRecipe} from "@/interfaces/recipe";
import Spinner from "@/components/Spinner";

async function getRecipes() {
    const res = await fetch('/api/recipes');
    return res.json()
}

function RecipesPage() {
    const [myRecipes, setMyRecipes] = React.useState<IRecipe[]>([]);
    const [likedRecipes, setLikedRecipes] = React.useState<IRecipe[]>([]);

    useEffect(() => {
        const getData = async () => {
            const { likedRecipes, myRecipes } = await getRecipes();
            setMyRecipes(myRecipes);
            setLikedRecipes(likedRecipes);
        };
        getData().then()
    }, [])

    return (<>
            <div className="container">
                <h1 className="text-4xl font-bold py-4 text-center">Welcome to Recipients page!</h1>
            </div>

            <section className="bg-teal-500">
            <div className="container py-10">
                    <h2 className="p-6 text-center">Here you can find recipes created my you</h2>
                    <Suspense fallback={<Spinner loading={true} />}>
                        <Recipes recipes={myRecipes}/>
                    </Suspense>
                </div>
            </section>

            <section>
                <div className="container">
                    <h2 className="p-6 text-center">Here you can find recipes that you liked</h2>

                    <Suspense fallback={<div>Loading...</div>}>
                        <Recipes recipes={likedRecipes}/>
                    </Suspense>
                </div>
            </section>


        </>
    )
}

export default RecipesPage;