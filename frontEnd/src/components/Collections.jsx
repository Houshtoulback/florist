import PropTypes from 'prop-types';

const bgGradient = {
    background: "rgb(255,255,255)",
    backgroundImage:
        "linear-gradient(0deg, rgba(255,255,255,1) 87%, #f4f4f4 100%)",
};

CollectionItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
};

function CollectionItem(props) {
    const { image, title } = props;
    return (
        <div className="flex flex-col items-center">
            <img className="" src={image} />
            <p className="capitalize font-medium text-black-300 text-base lg:text-xl text-center">
                {title}
            </p>
        </div>
    );
}

export default function Collections() {
    return (
        <div
            className="py-10  grid grid-cols-2 xl:grid-cols-4 place-items-center"
            style={bgGradient}
        >
            <CollectionItem image="assets/cactus.jpg" title="cactus" />
            <CollectionItem image="assets/bonsai.jpg" title="bonsai" />
            <CollectionItem image="assets/succulent.jpg" title="succulent" />
            <CollectionItem
                image="assets/indoorPlants.jpg"
                title="indoor plants"
            />
        </div>
    );
}
