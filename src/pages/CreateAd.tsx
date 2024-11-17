import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";

export type FormValues = {
   title: string
   description: string,
   category: number,
   price: number,
   picturesUrl: string[],
   location: string,
   adTags: number[],
   owner: string,
   createdAt: Date
}

const CREATE_AD = gql`
   mutation Mutation($data: AdInput!) {
      createNewAd(data: $data) {
         id
      }
   }
`;

const GET_ALL_CATEGORIES = gql`
   query GetAllCategories {
      getAllCategories {
         name
         id
      }
   }
`;

const GET_ALL_TAGS = gql`
   query Query {
      getAllTags {
         name
         id
      }
   }
`;

const CreateAd = () => {
   const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors }  } = useForm<FormValues>({defaultValues: {
      title: "Titre de mon annonce",
      description: "Description de mon annonce",
      category: 6,
      price: 10,
      picturesUrl: ["https://picsum.photos/200"],
      location: "Ma ville",
      owner: "C'est moi"
   }});
   
   const { loading: loadingCategories, error: errorCategories, data: getAllCategoriesData } = useQuery(GET_ALL_CATEGORIES);
   const { loading: loadingTags, error: errorTags, data: getAllTagsData } = useQuery(GET_ALL_TAGS);
   
   const [createNewAd] = useMutation(CREATE_AD);
   if (loadingCategories || loadingTags) return 'Submitting...';
   if (errorCategories) return <p>Error in Categories: {errorCategories.message}</p>;
   if (errorTags) return <p>Error in Tags: {errorTags.message}</p>;
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      try {
         await createNewAd({
            variables: {
               data: {
                  title: formData.title,
                  description: formData.description,
                  category: formData.category,
                  price: Number(formData.price),
                  picturesUrl: formData.picturesUrl,
                  location: formData.location,
                  owner: formData.owner,
                  createdAt: formData.createdAt + "T00:00:00.000Z",
                  adTags: formData.adTags
               },
            },
         });

         toast.success("Annonce créée avec succès !");
         navigate("/");
      } catch (err) {
         console.error("Erreur lors de la création de l'annonce :", errors, err);
         toast.error("Une erreur est survenue !");
      }
   
   }

   return (
      <form
         method="post"
         className="form"
         onSubmit={handleSubmit(onSubmit)}
      >
         <label htmlFor="title">Quel est le titre de votre annonce ?
            <input className="text-field" type="text" {...register("title", { required: "Le titre est obligatoire" })} placeholder="Titre de l'annonce" />
         </label>
         
         <label htmlFor="description">Description
            <textarea className="text-field" {...register("description")} id="description" placeholder="Description..."></textarea>
         </label>
         
         <select className="text-field" {...register("category", { required: true })} id="category">
            <option value="">Choisissez une catégorie</option>
            {getAllCategoriesData.getAllCategories.map((category: any) => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
         
         <label htmlFor="price">Prix
            <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
         </label>
         
         <label htmlFor="pictures">Entrez l'URL de votre image
            <input className="text-field" type="text" {...register("picturesUrl", {
               required: true,
               maxLength: { value: 2000, message: "Maximum 2000 characters" },
               })}
            />
         </label>

         <label htmlFor="location">Localisation
            <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
         </label>
         
         <h4>Souhaitez-vous ajouter un ou plusieurs tag(s) ?</h4>
         <div className="checkbox-container">
            {getAllTagsData.getAllTags.map((tag: any) => (
               <label key={tag.id} htmlFor={`${tag.id}`}>
                  <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("adTags")} />{tag.name}
               </label>
            ))}
         </div>

         <label htmlFor="owner">Vendeur
            <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
         </label>

         <label htmlFor="createdAt">Date d'ajout
            <input className="text-field" type="date" {...register("createdAt")} />
         </label>

         <button className="button create-ad" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;