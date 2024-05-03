import {IRecipe, Recipes} from "@/components/Recipes/Recipes";
import React from "react";

const recipes: IRecipe[] = [
    {
        id: 1,
        name: "Pasta",
        description: "Pasta with tomato sauce",
        created_at: new Date(),
        creator_id: 1,
        image: "https://via.placeholder.com/150",
        prep_time: 30,
        ingredients: ["pasta", "tomato sauce"]
    },
    {
        id: 2,
        name: "Pizza",
        description: "Pizza with cheese",
        created_at: new Date(),
        creator_id: 2,
        image: "https://via.placeholder.com/150",
        prep_time: 60,
        ingredients: ["dough", "cheese"]
    }
];

export default function Recipients() {
    return (<div>
        <h1 className="text-4xl font-bold">Welcome to Recipients page!</h1>
        <div>this is Auth page</div>
        <Recipes recipes={recipes} />
    </div>)
}