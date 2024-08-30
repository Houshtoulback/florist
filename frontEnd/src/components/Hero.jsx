import { Link } from "react-router-dom";

const bgStyle = {
    backgroundImage: "url(assets/banner.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
};

function Hero() {
    return (
        <div
            className="h-screen w-screen text-white bg-[url('/img/hero-pattern.svg')]"
            style={bgStyle}
        >
            <div className="flex flex-col items-center justify-center py-48 capitalize text-center">
                <h1 className="text-lg md:text-2xl pb-10">
                    The Boutique Store For Plants!
                </h1>
                <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black w-6/12 break-normal overflow-y-hidden">
                    Everything Is Better With Plants
                </p>
                <button className="py-4 px-5 mt-7 font-bold bg-green-600 hover:bg-green-700 hover:shadow-md transition">
                    <Link to="/shop">Shop Now</Link>
                </button>
            </div>
        </div>
    );
}

export default Hero;
