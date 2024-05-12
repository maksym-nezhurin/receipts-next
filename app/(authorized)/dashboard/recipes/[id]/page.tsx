'use client'
import {Recipe} from "@/components/Recipe/Recipe";
import { useState, useEffect} from "react";
import Spinner from "@/components/Spinner";

const getTheRecipe = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
        return await response.json();
    } catch (error) {
        console.log('Error in getTheRecipe', error);
        return null;
    }
}

export default function RecipePage ({ params: { id } }: { params: { id: string } } ) {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const res = await getTheRecipe(id);

            setRecipe(res.data);
        };
        getData().then().finally(() => setLoading(false));
    }, [id]);

    return loading ? <Spinner loading={true} /> : (
        <div>
            <h1 className="text-4xl font-bold">Welcome to Recipe page!</h1>
            <div>this is Auth page</div>
            <Recipe recipe={recipe} />
        </div>
    )
}