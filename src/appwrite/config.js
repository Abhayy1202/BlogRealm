import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    category,
    slug,
    content,
    featuredImage,
    status,
    userId,
    author
  }) {
    try {
      //logic is copied from documentation
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //document id
        {
          title,
          content,
          category,
          featuredImage,
          status,
          userId,
          author
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, category, content, featuredImage, status,author }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          category,
          content,
          featuredImage,
          status,
          author
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries //queries = [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async getLatestPostsByCategory() {
    try {
      const categories = ["Technology", "Design", "Development","Writing"];
      const promises = categories.map((category) =>
        this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [
            Query.equal("category", category),
            Query.equal("status", "active"),
            Query.orderDesc("$createdAt"),
            Query.limit(1),
          ]
        )
      );
      const results = await Promise.all(promises);
      return results
        .filter((result) => result.documents.length > 0) // Only keep categories with documents
        .flatMap((result) => result.documents); 
    } catch (error) {
      console.log(
        "Appwrite service :: getLatestPostsByCategory :: error",
        error
      );
      return [];
    }
  }

  async getLatestPosts(limit = 4) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.orderDesc("$createdAt"),
          Query.limit(limit),
          Query.equal("status", "active"),
        ]
      );
    } catch (error) {
      console.log("Appwrite service :: getLatestPosts :: error", error);
      return [];
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

    async getFilePreview(fileId) {
    try {
      const previewUrl = this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
        //   (headers = {
        //     "Cache-Control": "public, max-age=3600", // 1 hour caching
        //   })
      );
      return previewUrl;
    } catch (error) {
      console.log("Appwrite service :: imagePreview :: error", error);
      return '';
    }
  }
}


const service = new Service()
export default service