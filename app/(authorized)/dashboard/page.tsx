import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href='/dashboard/recipes'>Recipes</Link>
            <p>this is the page about auth users</p>
        </div>
    )
}