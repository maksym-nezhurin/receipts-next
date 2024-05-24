import Image from "next/image";
import {ReactNode} from "react";

export const HeroImage = ({ title, subtitle, children }: { title: string, subtitle: string, children: ReactNode }) => {
    return (<div className="relative h-96">
        <Image src={'/images/bg.jpg'} alt={title} width={1200} height={400} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full">
            {children}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="text-xl text-white">{subtitle}</p>
        </div>
    </div>)
}