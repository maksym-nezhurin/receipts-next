import {Recipe} from "@/components/Recipe/Recipe";
import Link from "next/link";
import {IRecipe} from "@/interfaces/recipe";

interface IRecipesResponse { data: IRecipe[], links: Object, meta: Object }
async function getServerSideProps(){
    const res = await fetch(`${process.env.API_URL}/api/recipes`);
    return await res.json();
}

export default async function RecipesPage()  {
    try {
        const { data = [], links, meta }: IRecipesResponse = await getServerSideProps();

        return (<div className="container">
            <h1 className="text-4xl font-bold">Welcome to Recipes page.</h1>
            <h2 className="py-3">Here you can find all available recipes and save items that you liked most.</h2>

            <div>
                {data.map((recipe) => {
                    return <Link key={recipe.id} href={`/recipes2/${recipe.id}`} className='my-6 mx-4'><Recipe recipe={recipe} /></Link>
                })}
            </div>
        </div>)
    } catch (error) {
        return <div>Error fetching: {JSON.stringify( error) }</div>
    }
}