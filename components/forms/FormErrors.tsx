export function FormErrors({ errors = [] }: { errors: string[] }) {
    return errors.map((err: string, index: number) => (
        <div key={index} className="text-pink-500 text-xs italic mt-1 py-2">
            {err}
        </div>
    ));
}