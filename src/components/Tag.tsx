export type TagProps = { id: number, name: string };

const Tag = ({ name }: TagProps) => {
   return (
      <>
         <p className="tag">{name}</p>
      </>
   );
};

export default Tag;