import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  cart: { name: string; amount: number }[];
};

export default function Test() {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "", amount: 0 }],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "cart",
    control,
  });
 
  return (
    <form
      className="p-8 bg-gray-100 rounded-lg shadow-md"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 ">
          <label className="block  text-gray-700  mb-1">
            Item Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter item name"
            {...register(`cart.${index}.name`, {required: true})}
          />

          <label className="block text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter amount"
            {...register(`cart.${index}.amount`, { valueAsNumber: true })}
          />
        </div>
      ))}
      <div className="flex gap-4">
      <button 
        type='button' 
        onClick={()=>{
            append({name: "orange", amount: 0})
        }} 
        className="w-full px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
      >
        append
      </button>
      <button 
        type='button' 
        onClick={()=>{
            prepend({name: "banana", amount: 10})
        }} 
        className="w-full px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
      >
        prepend
      </button>
      <button 
        type='button' 
        onClick={()=>{
            remove(0)
        }} 
        className="w-full px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
      >
        remove
      </button>
      
      <button className="w-full px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600">
        Submit
      </button>
      </div>
    </form>
  );
}
