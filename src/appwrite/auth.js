import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    //account tab hi banega jab constructor call hoga
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)        //your api endpoint
            .setProject(conf.appwriteProjectId);  //your projectid
        this.account = new Account(this.client);
    }

    //jo bhi account banayega wo ek object call karega with email pwd and name
    //ye method fail bhi ho sakta hai to try catch use kiya humne
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            //return userAccount only if it has been created
            //ID.unique() creates a unique id
            if(userAccount){
                //call another method
                //account ban gaya hai to login hi karwa do
                return this.login({email, password});
            }
            else{
                //it could be null too
                return userAccount;
            }
        } catch(error) {
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch (error){
            throw error;
        }
    }

    //ki account logged in hai ya nahin
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        //agar account exist hi na kare to null return kardo
        return null; 
    }

    async logout(){
        try {
            //we will use .deleteSessions so that all accounts which are logged in in all the browsers get logged out
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
//hum nahi chahte ki bina object ke account ban jaaye, isiliye account variable le liya hai
//constructor ke andar banayenge account ka object taaki jab constructor call ho tabhi bas bane object

const authService = new AuthService();

export default authService;
