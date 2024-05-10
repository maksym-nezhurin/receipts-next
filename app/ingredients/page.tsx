import {IngredientList} from "@/components/IngredientList/IngredientList";

export const getData = async () => {
    const res = await fetch('http://localhost:8000/api/ingredients');
    const { data } = await res.json();
    return data
}

export default async function IngredientsPage() {
    const ingredients = await getData();
    // console.log(ingredients)
    return (<>
        <h1>Ingredients</h1>
        <IngredientList ingredients={ingredients}/>
    </>)
}