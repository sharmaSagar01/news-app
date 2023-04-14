import Link from "next/link";

type Props = {
  category: string;
  isActive: boolean;
};

const NavLink = ({ category, isActive }: Props) => {
  return (
    <Link
      href={`/news/${category}`}
      className={` navLink ${
        isActive &&
        "underline decoration-yellow-400 underline-offset-4 font-bold textg-lg"
      }`}
    >
      {category}
    </Link>
  );
};

export default NavLink;
