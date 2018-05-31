import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./src/schema";
const app = express();

app.use("/graphql",expressGraphQL({
  schema:schema,
  graphiql:true
}));

app.listen(4000,()=>{
    console.log("Server Running on Port No 4000");
    
})