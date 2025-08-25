"use client";
//Props shape
interface Props {
  items: string[]; //list of the suggestion stirngs
  onSelect: (term: string) => void; //callback  when one is clicked
}

export default function SearchResults({ items, onSelect }: Props) {
  //if no suggestions , render nothing
  if (!items.length) return null;

  //Absolute positioned list under the input block

  return (
    <ul className="absolute top-full  mt-1 w-full   bg-white   shadow-md z-10 ">
      {items.map((text) => (
        <li
          key={text}
          onClick={() => onSelect(text)} // fire callback on Click
          className="cursor-pointer  py-3 border-b-[0.5px] border-[#aeadad]  hover:bg-gray-100"
        >
          {text}
        </li>
      ))}
    </ul>
  );
}
