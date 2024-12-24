import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';

const blogRoutes = Router();

blogRoutes.post(
  '/',
  auth('user'),
  validateRequest(blogValidationSchema.createBlogValidationSchema),
  blogController.createBlog,
);

blogRoutes.get('/', blogController.getAllBlogs);

blogRoutes.patch('/:id', auth('user'), blogController.updateBlog);

blogRoutes.delete(
  '/:id',
  auth('user', 'admin'),
  validateRequest(blogValidationSchema.updateBlogValidationSchema),
  blogController.deleteBlog,
);
blogRoutes.delete(
  '/admin/blogs/:id',
  auth('admin'),
  validateRequest(blogValidationSchema.updateBlogValidationSchema),
  blogController.deleteBlog,
);

export default blogRoutes;
