import React from "react";
import {
    Header,
    Hero,
    Footer
} from "../components"

type Props = {
    children: React.ReactNode,
    showHero: boolean,
    className?: string
}

export default function Layout({
    children,
    showHero=false,
    className
}:Props){
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}
            <div className={`container mx-auto flex-1 py-10 ${className}`} >
                {children}
            </div>
            <Footer/>
        </div>
    )
}