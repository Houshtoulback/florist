import { ImLeaf } from "react-icons/im";
import { GiFlowerPot } from "react-icons/gi";
import { AiFillTrophy } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";

function WhyChooseUsItem(props: {
    title: string;
    parag: string;
    icon: React.ReactNode;
}) {
    const { title, parag, icon } = props;
    return (
        <div className="flex p-5">
            <div className="">
                <div className="bg-stone-300 w-14 h-14 mr-2 rounded-full flex justify-center items-center text-green-700 text-2xl">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="my-3">{parag}</p>
            </div>
        </div>
    );
}

export default function WhyChooseUs() {
    return (
        <div className="m-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <WhyChooseUsItem
                icon={<ImLeaf />}
                title="High Quality Plants"
                parag="A line about the service you've mentioned above."
            />
            <WhyChooseUsItem
                icon={<GiFlowerPot />}
                title="Wide Plant Range"
                parag="A line about the service you've mentioned above."
            />
            <WhyChooseUsItem
                icon={<AiFillTrophy />}
                title="Excellent Services"
                parag="A line about the service you've mentioned above."
            />
            <WhyChooseUsItem
                icon={<FaTruckMoving />}
                title="Fast Delivery"
                parag="A line about the service you've mentioned above."
            />
        </div>
    );
}
