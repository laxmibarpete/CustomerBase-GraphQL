import axios from "axios";
import { GraphQLObjectType, GraphQLString,GraphQLInt,
         GraphQLSchema,GraphQLList,GraphQLNonNull  } from "graphql";

// const customers = [
//     {id:'101',name:"laxmi",age:23},
//     {id:'102',name:"amit",age:24},
//     {id:'103',name:"atul",age:25}
// ];

const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        age:{ type:GraphQLInt }
    })
}); 

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer: {
            type: CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get("http://localhost:3000/customers/"+args.id).then((res)=>res.data)
            }
        },
        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get("http://localhost:3000/customers/").then((res)=>res.data)
            }
        }
    }
  
});

const mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post("http://localhost:3000/customers/",{
                    name:args.name,
                    age:args.age,
                    email: args.email
                }).then((res)=>res.data)
            }
        },
        deleteCustomer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.delete("http://localhost:3000/customers/"+args.id,{
                }).then((res)=>res.data)
            }
        },
        editCustomer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.put("http://localhost:3000/customers/"+args.id,args).then((res)=>res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({query:RootQuery,
mutation
})