// import { useEffect, useState } from "react";
// import { CategoryProps } from "../components/Category";
// import { useNavigate } from "react-router-dom";
// import { useForm, SubmitHandler } from "react-hook-form"
// import { toast } from "react-toastify";
// import { TagProps } from "../components/Tag";

// export type FormValues = {
//    title: string
//    description: string,
//    category: number,
//    price: number,
//    picture: string,
//    location: string,
//    tags: number[],
//    owner: string,
//    createdAt: string
// }

// const CreateAd = () => {
//    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

//    const navigate = useNavigate();
//    const [categories, setCategories] = useState<CategoryProps[]>([]);
//    const [tags, setTags] = useState<TagProps[]>([]);

//    useEffect(() => {
//       const fetchCategories = async () => {
//          const result = await axios.get("http://localhost:3000/categories");
//          setCategories(result.data);
//       }
      
//       const fetchTags = async () => {
//          const result = await axios.get("http://localhost:3000/tags");
//          setTags(result.data);
//       }
      
//       fetchCategories();
//       fetchTags();
//    }, []);
   
//    const onSubmit: SubmitHandler<FormValues> = async (data) => {
//       try {
//          const dataForBackend = {
//             ...data,
//             tags: data.tags.map((tag) => ({ id: tag })),
//          };
         
//          await axios.post("http://localhost:3000/ads", dataForBackend);
//          toast.success("Ad has been added");
         
//          navigate("/");
//       } catch (error) {
//          console.error("Erreur lors de la création de l'annonce :", error, errors);
//       }
//    }

//    return (
//       <form
//          method="post"
//          className="form"
//          onSubmit={handleSubmit(onSubmit)}
//       >
//          <label htmlFor="title">Quel est le titre de votre annonce ?
//             <input className="text-field" type="text" {...register("title", { required: "Le titre est obligatoire" })} placeholder="Titre de l'annonce" />
//          </label>
         
//          <label htmlFor="description">Description
//             <textarea className="text-field" {...register("description")} id="description" placeholder="Description..."></textarea>
//          </label>
         
//          <select className="text-field" {...register("category", { required: true })} id="category">
//             <option value="">Choisissez une catégorie</option>
//             {categories.map(category => (
//                <option value={category.id} key={category.id}>{category.name}</option>
//             ))}
//          </select>
         
//          <label htmlFor="price">Prix
//             <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
//          </label>
         
//          {/* Provisoire pour le test ! */}
//          <label htmlFor="picture">Entrez l'URL de votre image
//             <input className="text-field" type="text" {...register("picture", {
//                required: true,
//                maxLength: { value: 2000, message: "Maximum 2000 characters" },
//                })}
//             />
//          </label>

//          <label htmlFor="location">Localisation
//             <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
//          </label>
         
//          <h4>Souhaitez-vous ajouter un ou plusieurs tag(s) ?</h4>
//          <div className="checkbox-container">
//             {tags.map(tag => (
//                <label htmlFor={`${tag.id}`}>
//                   <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
//                </label>
//             ))}
//          </div>

//          <label htmlFor="owner">Vendeur
//             <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
//          </label>

//          <label htmlFor="createdAt">Date d'ajout
//             <input className="text-field" type="date" {...register("createdAt")} />
//          </label>

//          <button className="button create-ad" type="submit">Créer</button>
//       </form>
//    );
// };

// export default CreateAd;