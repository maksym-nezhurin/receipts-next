import {Recipe} from "@/components/Recipe/Recipe";

export default function RecipePage () {
    return (
        <div>
            <h1 className="text-4xl font-bold">Welcome to Recipe page!</h1>
            <div>this is Auth page</div>
            <Recipe recipe={null} />
        </div>
    )
}