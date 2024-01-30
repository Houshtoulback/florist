import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function RatingStars(props: { rating: number }): JSX.Element {
  const { rating } = props;
  const fillStars = Math.trunc(rating);
  const halfStars = Math.ceil(rating - fillStars);
  const outlineStars = 5 - (halfStars + fillStars);
  const stars = [];
  for (let i = 0; i < fillStars; i++) {
    stars.push(<AiFillStar color={"#00AB84"} key={`i${i}`} />);
  }
  if (halfStars !== 0) {
    stars.push(<BsStarHalf color={"#00AB84"} key={"j"} size={"14px"} />);
  }
  for (let k = 0; k < outlineStars; k++) {
    stars.push(<AiOutlineStar color={"#00AB84"} key={`k${k}`} />);
  }

  return <span className='hidden sm:flex my-1 lg:my-2'>{stars}</span>;
}
