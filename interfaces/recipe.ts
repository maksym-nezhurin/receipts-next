export interface IRecipe {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    creator_id: number;
    image: string;
    prep_time: number;
    ingredients: IIngredient[];
    comments?: IComment[];
    likes?: {
        amount: number;
        users: {
            id: number;
            name: string;
        }[];
    };
}

export interface IIngredient {
    id: number;
    name: string;
    calories: string;
    category: string;
}

export interface IComment {
    content: string;
    created_at: Date;
    id: number;
    user?: {
        name: string;
    };
}
