import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
    
@Controller('weather')
export class WeatherController {
    
  constructor(private weatherService: WeatherService) { }
    
  // Submit a post
  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.weatherService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }
    
  // Fetch a particular post using ID
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.weatherService.getPost(postID);
    if (!post) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }
    
  // Fetch all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.weatherService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

   // Edit a particular post using ID
   @Put('/edit')
   async editPost(
     @Res() res,
     @Query('postID', new ValidateObjectId()) postID,
     @Body() createPostDTO: CreatePostDTO,
   ) {
     const editedPost = await this.weatherService.editPost(postID, createPostDTO);
     if (!editedPost) {
         throw new NotFoundException('Post does not exist!');
     }
     return res.status(HttpStatus.OK).json({
       message: 'Post has been successfully updated',
       post: editedPost,
     });
   }


   // Delete a post using ID
   @Delete('/delete')
   async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
     const deletedPost = await this.weatherService.deletePost(postID);
     if (!deletedPost) {
         throw new NotFoundException('Post does not exist!');
     }
     return res.status(HttpStatus.OK).json({
       message: 'Post has been deleted!',
       post: deletedPost,
     });
   }
}