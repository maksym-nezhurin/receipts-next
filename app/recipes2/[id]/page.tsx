import {Recipe} from "@/components/Recipe/Recipe";
import Link from "next/link";
import {IRecipe} from "@/interfaces/recipe";

interface IRecipesResponse { data: IRecipe[], links: Object, meta: Object }
async function getServerSideProps(id: string)
{
    const res = await fetch(`http://127.0.0.1:8000/api/recipes/${id}`);
    return await res.json();
}

export default async function RecipePage({ params: { id } }: { params: { id: string } } )  {
    try {
        const { data }: { data: IRecipe } = await getServerSideProps(id);

        return (<div className="container">
            <div className="flex justify-between">
                <div></div>
                <div>
                    <Link className="border-1 rounded bg-gray-400 p-2 text-white hover:bg-gray-600" href="/recipes2">Back to recipes</Link>
                </div>
            </div>
            <h1 className="text-4xl font-bold text-center">Recipe: {data.name}!</h1>

            <div className="m-10">
                <Recipe recipe={data} />
            </div>
        </div>)
    } catch (error) {
        return <div>Error fetching: {JSON.stringify( error) }</div>
    }
}