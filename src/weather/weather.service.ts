import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';


@Injectable()
export class WeatherService {
   constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

   async addPost(CreatePostDTO: CreatePostDTO): Promise<Post> {
       const newPost = await new this.postModel(CreatePostDTO);
       return newPost.save();
   }

   async getPost(postID): Promise<Post> {
       const post = await this.postModel
       .findById(postID)
       .exec();
       return post;
   }

   async getPosts(): Promise<Post[]> {
       const posts = await this.postModel.find().exec();
       return posts;
   }

   async editPost(postID, CreatePostDTO: CreatePostDTO): Promise<Post> {
       const editedPost = await this.postModel
       .findByIdAndUpdate(postID, CreatePostDTO, { new:true });
       return editedPost;
   }

   async  deletePost(postID) : Promise<any> {
       const deletedPost = await this.postModel
       .findByIdAndRemove(postID);
       return deletedPost;
   }
}
