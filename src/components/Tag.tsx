export type TagProps = { id: number, name: string };

const Tag = ({ id, name }: TagProps) => {
   return (
      <>
         <p className="tag" key={id}>{name}</p>
      </>
   );
};

export default Tag;