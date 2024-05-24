'use client';
import {IIngredient, IRecipe} from "@/interfaces/recipe";
import {CheckboxItem} from "@/components/CheckboxItem/CheckboxItem";
import {useEffect, useState} from "react";
import {Recipe} from "@/components/Recipe/Recipe";

interface IProps {
    ingredients: IIngredient[]
}

interface ICheckedState {
    [key: string | number]: boolean;
}

export const IngredientList = (props: IProps) => {
    const { ingredients } = props;
    const initialState = {};
    ingredients.forEach(ingredient => {
        // @ts-ignore
        initialState[ingredient.id] = false;
    })
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [checkedState, setCheckedItem] = useState<ICheckedState>(initialState);

    const onChange = (state: boolean, id: string | number) => {
        setCheckedItem(prevState => ({
            ...prevState,
            [id]: state
        }))
    }

    useEffect(() => {
        const getRecipesByIngredients = async () => {
            const params = Object.keys(checkedState).filter(key => checkedState[key]).join(',');
            let queryString = encodeURIComponent(params);
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/recipes/by-ingredients/${queryString}`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { data } = await res.json();
            setRecipes(data);
        }
        getRecipesByIngredients()
    }, [checkedState]);

    return <div>
        <h2 className="text-center">Ingredient List</h2>
        <div>
            {ingredients.map((ingredient, index) => {
                return <div key={index} className="flex justify-between">
                    <CheckboxItem id={ingredient.name} label={ingredient.name} checked={checkedState[ingredient.id]}
                                  onChange={(state: boolean) => onChange(state, ingredient.id)}/>
                    <div>{ingredient.category}</div>
                    <div>{ingredient.calories} calories</div>
                </div>
            })}
        </div>

        <div>
            <h2 className="text-xl">Search result:</h2>

            <div>{recipes && recipes.map((recipe) => <Recipe key={recipe.id} className="my-4" recipe={recipe}/>) } </div>
        </div>
</div>
}