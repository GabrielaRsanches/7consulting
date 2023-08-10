import { o } from "odata";

const data = {
  name: "Gabi",
};

const post = o("https://dkowuyqjowefwhrodazp.supabase.co")
  .post("Categoria", data)
  .query();

console.log(post);

const get = o("https://dkowuyqjowefwhrodazp.supabase.co")
  .get("Categoria")
  .query();

const del = o("https://dkowuyqjowefwhrodazp.supabase.co").delete(
  `Categoria('name')`
);
