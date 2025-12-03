// v.v.v.imp
// Terminology changed: Collection → Table, Document → Row, Attribute → Column.


import conf from "../conf/conf";

import {Client,ID,Databases,Storage,Query} from "appwrite";

export class DBservice{
    client = new Client();
    databases
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client) 
    }

    async createPost({title,slug,content,featuredImage,status,userId,Authorname}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteTableId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    Authorname
                })
        } catch (error) {
            console.log("error is",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteTableId,slug,
                {
                    
                    title,
                    content,
                    featuredImage,
                    status,
                    // userId  not required
                })
        } catch (error) {
            console.log("error is:",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteTableId,slug)
            return true
        } catch (error) {
            console.log("error is:",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteTableId,slug)

        } catch (error) {
            console.log("error is:",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteTableId,queries)
            
        } catch (error) {
            console.log("error is:",error);
            return false
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId:ID.unique(),
                file
            })
        } catch (error) {
            console.log("error is:",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.log("error is:",error);
            return false
        }
    }  
    
    // getFilePreview : not for free users of appwrite
    getFilePreview(fileId) {
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId
        });
        
          
    }
    
}


const service= new DBservice();

export default service;