import {IIngredient} from "@/interfaces/recipe";

interface IProps {
    ingredient: IIngredient;
}
export const Ingredient = (props: IProps) => {
    const { ingredient } = props;

    return <div className="flex justify-between">
        <div className="text-green-800">{ingredient.name}:</div>
        <div>{ingredient.calories} calories</div>
    </div>
}